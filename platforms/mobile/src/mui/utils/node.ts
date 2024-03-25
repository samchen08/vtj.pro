export function getBoundingClientRect(
  selector: string,
  component?: any
): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(component);
    query
      .select(selector)
      .boundingClientRect((info) => {
        resolve(info as UniApp.NodeInfo);
      })
      .exec();
  });
}

export function getScrollOffset(
  selector: string,
  component: any
): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(component);
    query
      .select(selector)
      .scrollOffset((info) => {
        resolve(info as UniApp.NodeInfo);
      })
      .exec();
  });
}


