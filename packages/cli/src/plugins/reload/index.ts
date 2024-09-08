import { type Plugin } from 'vite';

export function reloadPlugin(): Plugin {
  return {
    name: 'reload-version',
    apply: 'build',
    transformIndexHtml(html) {
      const now = Date.now();
      return html.replace(
        /<\/title>/,
        `</title>
           <script>
           var __BUILD_TIME__ = '${now}';
           (function () {
            const regex = /<!--{{(\\d*)}}-->/;
            window.fetch('?t=' + Date.now()).then(async (res) => {
              const content = await res.text();
              if (content) {
                const result = content.match(regex);
                if (result && result[1]) {
                  if (result[1] !== __BUILD_TIME__) {
                    top.location.reload(true);
                  }
                }
              }
            });
          })();
           </script>
           <!--{{${now}}}-->
          `
      );
    }
  };
}
