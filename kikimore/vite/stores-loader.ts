export default async (appName, stores, environment, pluginsPath) => {
  if (environment == 'production') {
    const object = {};
    const moduleContent = await prepareModuleContent();
    object[`stores-loader-${appName}`] = moduleContent;
    return object;
  }
  if (environment == 'development') {
    return ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.startsWith(`/@modules/stores-loader-${appName}`)) {
          const moduleContent = await prepareModuleContent();
          ctx.type = 'js';
          ctx.body = `
          ${moduleContent}
          `;
        } else {
          await next();
        }
      });
    };
  }

  async function prepareModuleContent() {
    let imports = '';
    const exportStores = [];
    Object.keys(stores).forEach((pluginName) => {
      Object.keys(stores[pluginName]).forEach((store) => {
        const resolvedPath = resolveStorePath(
          stores[pluginName][store],
          pluginName,
        );
        imports += `import { ${store} } from '${resolvedPath}'; \n`;
        exportStores.push(store);
      });
    });

    return `
        ${imports}
        export const provides = {${exportStores}};
      `;
  }

  function resolveStorePath(store, pluginName) {
    const path = require('path');
    return path.resolve(`/~plugins/${pluginName}/${appName}/`, store);
  }
};
