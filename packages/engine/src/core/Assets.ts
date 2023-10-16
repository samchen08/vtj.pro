import { watch, WatchStopHandle, ShallowReactive } from 'vue';
import { jsonp } from '@vtj/utils';
import {
  Dependencie,
  ComponentDescription,
  AssetsContent,
  AssetsCategory,
  NodeFrom
} from './types';

import { Project } from '../models';

import { EVENT_ASSETS_LOADED, emitter } from './emitter';
import {
  builtInComponents,
  builtInCategories,
  builtInElements
} from './built-in';
import { SetterValueTypes } from '../views/setters';
import { Service } from './services';

export interface IComponentGroup {
  name: string;
  label: string;
  count: number;
  library?: string;
  names?: string[];
  components?: ComponentDescription[];
  children?: IComponentGroup[];
}

export class Assets {
  private unwatch?: WatchStopHandle;
  packages: Dependencie[] = [];
  elements: ComponentDescription[] = [...builtInElements];
  elementsMap: Record<string, ComponentDescription> = {};
  components: ComponentDescription[] = [...builtInComponents];
  componentMap: Record<string, ComponentDescription> = {};
  componentGroups: IComponentGroup[] = [];
  public isReady: boolean = false;
  constructor(
    public service: Service,
    public project?: ShallowReactive<Project>
  ) {
    if (project) {
      this.unwatch = watch(project.dependencies, (v) => this.load(v), {
        deep: true
      });
    }
    this.elementsMap = this.parseMap<ComponentDescription>(
      this.elements,
      false
    );
  }

  private clear() {
    this.components = [...builtInComponents];
    this.componentMap = {};
    this.componentGroups = [];
  }

  private getCateoryComponents(
    cateory: AssetsCategory,
    components: ComponentDescription[]
  ) {
    const items = components.filter(
      (n) => n.categoryId === cateory.id && n.hidden !== true
    );
    return {
      name: cateory.id,
      label: cateory.category,
      count: items.length,
      components: items
    } as IComponentGroup;
  }

  private parseGroups(packages: AssetsContent[]) {
    const result: IComponentGroup[] = [];
    for (let pkg of packages) {
      const { categories, components, label, name, library, names } = pkg;
      if (!categories || !components) {
        continue;
      }
      const children: IComponentGroup[] = categories.map((c) =>
        this.getCateoryComponents(c, components)
      );
      const total = children.reduce((p, n) => {
        return n.count + p;
      }, 0);

      const group: IComponentGroup = {
        name: pkg.name,
        label: label || name,
        library,
        names,
        count: total,
        children
      };
      result.push(group);
    }
    return result;
  }

  private parseMap<T extends ComponentDescription>(
    list: T[],
    isPackage: boolean = true
  ) {
    const map: Record<string, T> = {};
    if (isPackage) {
      for (const c of list) {
        if (c.package) {
          map[c.name] = c;
        }
      }
    } else {
      for (const c of list) {
        map[c.name] = c;
      }
    }
    return map;
  }

  async load(dependencies: Dependencie[]) {
    this.packages = dependencies;
    this.isReady = false;
    const deps = dependencies.filter((n) => !!n.assetsUrl && n.enabled);
    this.clear();
    const packages: AssetsContent[] = [
      {
        name: 'vue',
        label: '内置',
        names: builtInComponents.map((n) => n.name),
        library: 'Vue',
        components: builtInComponents,
        categories: builtInCategories
      }
    ];
    for (const item of deps) {
      const content = await jsonp<AssetsContent>(
        item.assetsUrl as string,
        {},
        { name: item.assetsLibrary, script: true }
      ).catch((e) => null);
      if (content) {
        content.name = content.name || (item.assetsLibrary as string);
        content.library = item.library;
        content.names = (content.components || []).map((n) => n.name);
        packages.push(content);
        this.components = this.components.concat(content.components || []);
      }
    }
    packages.sort((a, b) => {
      return (a.order || 0) - (b.order || 0);
    });
    this.componentGroups = this.parseGroups(packages);
    this.componentMap = this.parseMap<ComponentDescription>(this.components);
    this.isReady = true;
    emitter.emit(EVENT_ASSETS_LOADED);
    const { components, componentGroups, componentMap } = this;
    return {
      components,
      componentGroups,
      componentMap
    };
  }

  async getBlockDescription(from: NodeFrom) {
    if (!from || typeof from === 'string') return null;
    const blockId = from.type === 'Schema' ? from.id : null;
    if (!blockId) return null;
    const dsl = await this.service.getFile(blockId);
    if (!dsl) return null;

    const { id, name, slots, props, emits } = dsl;
    const getSetters = (type: string | string[]) => {
      const types = Array.isArray(type) ? type : [type];
      let setters: string[] = [];
      for (const t of types) {
        setters = setters.concat(SetterValueTypes[t.toLowerCase()] || []);
      }
      return setters;
    };
    const desc: ComponentDescription = {
      id,
      name,
      childIncludes: slots?.length ? undefined : false,
      props: (props || []).map((n) => {
        return typeof n === 'string'
          ? {
              name: n
            }
          : {
              name: n.name,
              type: n.type as any,
              setters: getSetters(n.type as any)
            };
      }),
      events: emits,
      slots
    };
    return desc;
  }

  dispose() {
    this.clear();
    if (this.unwatch) {
      this.unwatch();
    }
  }
}
