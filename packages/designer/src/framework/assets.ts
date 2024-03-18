import { ref, type Ref } from 'vue';
import type {
  Material,
  MaterialCategory,
  MaterialDescription,
  NodeFrom,
  Service,
  BlockPropDataType,
  BlockSchema
} from '@vtj/core';
import { arrayToMap } from '@vtj/utils';
import { builtInMaterials, setterManager } from '../managers';

export interface AssetGroup {
  name: string;
  label: string;
  count: number;
  library?: string;
  names?: string[];
  components?: MaterialDescription[];
  children?: AssetGroup[];
}

export class Assets {
  components: MaterialDescription[] = [];
  componentMap: Map<string, MaterialDescription> = new Map();
  groups: Ref<AssetGroup[]> = ref([]);
  private caches: Record<string, BlockSchema> = {};
  constructor(public service: Service) {}

  private getCateoryComponents(
    cateory: MaterialCategory,
    components: MaterialDescription[]
  ) {
    const items = components.filter(
      (n) => n.categoryId === cateory.id && n.hidden !== true
    );
    return {
      name: cateory.id,
      label: cateory.category,
      count: items.length,
      components: items
    } as AssetGroup;
  }

  private parseGroups(materials: Material[]) {
    const result: AssetGroup[] = [];
    for (let pkg of materials) {
      const { categories, components, label, name, library } = pkg;
      if (!categories || !components) {
        continue;
      }
      const names = components.filter((n) => !!n.package).map((n) => n.name);
      const children: AssetGroup[] = categories.map((c) =>
        this.getCateoryComponents(c, components)
      );
      const total = children.reduce((p, n) => {
        return n.count + p;
      }, 0);

      const group: AssetGroup = {
        name: pkg.name,
        label: label || name,
        count: total,
        names,
        library,
        children
      };
      result.push(group);
    }
    return result;
  }

  load(materials: Material[]) {
    const packages = [...builtInMaterials, ...materials].filter((n) => !!n);
    packages.sort((a, b) => a.order - b.order);
    for (let pkg of packages) {
      if (pkg.components) {
        this.components = this.components.concat(pkg.components);
      }
    }
    this.groups.value = this.parseGroups(packages);
    this.componentMap = arrayToMap(this.components, 'name');
  }

  async getBlockMaterial(from: NodeFrom) {
    if (!from || typeof from === 'string') return null;
    const blockId = from.type === 'Schema' ? from.id : null;
    if (!blockId) return null;
    const dsl = this.caches[blockId] || (await this.service.getFile(blockId));
    if (!dsl) return null;
    this.caches[blockId] = dsl;
    const { id, name, slots, props, emits } = dsl;
    /**
     * 根据数据类型自动匹配设置器
     * @param type
     * @returns
     */
    const getSetters = (type: string | string[]) => {
      const types = Array.isArray(type) ? type : [type];
      let setters: string[] = [];
      for (const t of types) {
        setters = setters.concat(
          setterManager.getByType(t as BlockPropDataType)
        );
      }
      return setters;
    };
    const desc: MaterialDescription = {
      id,
      name,
      // 如果没有定义插槽，不能放置子组件
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
      slots,
      from
    };
    return desc;
  }

  clearCaches() {
    this.caches = {};
  }
}
