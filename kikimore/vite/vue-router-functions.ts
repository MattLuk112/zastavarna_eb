export default async (appName, plugins, environment, pluginsPath) => {
  async function prepareModuleContent() {
    const prepared = [];
    if (plugins.length) {
      for (const plugin of plugins) {
        Object.keys(require.cache).forEach((key) => {
          if (
            key.includes(`/plugins/${plugin}`) &&
            !key.includes('node_modules')
          ) {
            delete require.cache[key];
          }
        });
        const required = await require(`${pluginsPath}/${plugin}/${appName}`)
          .default;
        const preparedFn = Object.keys(required.router).map((k) => {
          return `${k}: ${required.router[k]}`;
        });
        prepared.push(`{
            ${preparedFn}
        }`);
      }
    }
    return `
      export const routerFunctions = [${prepared}];
    `;
  }

  if (environment == 'production') {
    const object = {};
    const moduleContent = await prepareModuleContent();
    object[`vue-router-functions-${appName}`] = moduleContent;
    return object;
  }
  if (environment == 'development') {
    return ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.startsWith(`/@modules/vue-router-functions-${appName}`)) {
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
};
