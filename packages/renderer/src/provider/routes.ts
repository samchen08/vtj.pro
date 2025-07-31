import type { PageFile } from '@vtj/core';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';

export interface CreateStaticRoutesOptions {
  name: string;
  prefix: string;
  pages: PageFile[];
  component: any;
  loader: (id: string) => Promise<any>;
  routeMeta?: RouteMeta;
  homepage?: string;
}

function createRoute(page: PageFile, options: CreateStaticRoutesOptions) {
  const { id, title, meta } = page;
  const { name = 'page', prefix = '', component, routeMeta } = options;
  const item: RouteRecordRaw = {
    name: id,
    path: `${prefix}${name}/${id}`,
    component,
    meta: {
      title,
      ...routeMeta,
      ...meta,
      __vtj__: id
    }
  };
  return item;
}

export function createStaticRoutes(options: CreateStaticRoutesOptions) {
  const {
    name = 'page',
    prefix = '',
    pages = [],
    component,
    loader,
    routeMeta,
    homepage
  } = options;
  const result: RouteRecordRaw[] = [];

  for (const page of pages) {
    const { id, title, dir, layout, children, meta } = page;
    if (dir) {
      const items = createStaticRoutes({
        name,
        prefix,
        component,
        routeMeta,
        homepage,
        loader,
        pages: children || []
      });
      result.push(...items);
    } else {
      if (layout) {
        const childRoutes = createStaticRoutes({
          name,
          prefix,
          component,
          routeMeta,
          homepage,
          loader,
          pages: children || []
        });
        const item: RouteRecordRaw = {
          name: `layout_${id}`,
          path: prefix,
          component: () => loader(id),
          meta: {
            title,
            ...routeMeta,
            ...meta,
            __vtj__: id
          },
          children: childRoutes
        };
        result.push(item);
        result.push(createRoute(page, options));
      } else {
        result.push(createRoute(page, options));
        if (homepage === id) {
          const home = createRoute(page, options);
          home.path = '';
          home.name = `home_${id}`;
          result.push(home);
        }
      }
    }
  }

  return result;
}
