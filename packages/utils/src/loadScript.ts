import load from 'load-script';

export interface LoadScriptOptions {
  // A boolean value used for script.async. By default this is true.
  async?: boolean;
  // A map of attributes to set on the script node before appending it to the DOM. By default this is empty.
  attrs?: Record<string, string>;

  // A string value used for script.charset. By default this is utf8.
  charset?: string;

  //  A string of text to append to the script node before it is appended to the DOM. By default this is empty.
  text?: string;

  // A string used for script.type. By default this is text/javascript.
  type?: string;

  // js 导出名称
  library?: string;
}

export function loadScript<T = any>(
  src: string,
  options: LoadScriptOptions = {}
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const { library } = options;
    load(src, options, (err, _script) => {
      if (err) {
        reject(err);
      } else {
        resolve(library ? (window as any)[library] : undefined);
      }
    });
  });
}
