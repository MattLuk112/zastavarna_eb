export default async (appName, plugins, environment, pluginsPath) => {
  async function prepareModuleContent() {
    const prepared = [];
    let shouldModifyIndex = false;
    let modifyIndex: any = {
      meta: [],
    };
    let importPlugins = '';
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
        for (const route of required.routes) {
          // Index route modification
          if (
            typeof route.path == 'undefined' ||
            !route.path ||
            route.path == '/'
          ) {
            delete route.path;
            Object.keys(route).forEach((key) => {
              if (key == 'meta') {
                modifyIndex.meta.push(route[key]);
              } else if (key == 'component') {
                modifyIndex.component = {
                  plugin,
                  component: route[key],
                };
              } else {
                modifyIndex[key] = route[key];
              }
              shouldModifyIndex = true;
            });
          } else {
            prepared.push(`
          {
            ${prepareRoute(route, plugin)}
          }
        `);
          }
        }

        // Import plugin file in development to watch for changes
        if (environment == 'development') {
          importPlugins += `
            import ${plugin}${appName} from '/~plugins/${plugin}/${appName}'; \n
          `;
        }
      }
    }

    let solvedModifyIndex;
    if (shouldModifyIndex) {
      if (modifyIndex.meta.length) {
        modifyIndex.meta = modifyIndex.meta.reduce(
          (r, c) => Object.assign(r, c),
          {},
        );
      }
      let plugin = '';
      if (typeof modifyIndex.component !== 'undefined') {
        plugin = modifyIndex.component.plugin;
        modifyIndex.component = modifyIndex.component.component;
      }
      solvedModifyIndex = `{ ${prepareRoute(modifyIndex, plugin)} }`;
    } else {
      solvedModifyIndex = false;
    }

    return `
      ${importPlugins}
      export const modifyIndex = ${solvedModifyIndex};
      export const dynamicRoutes = [${prepared}];
    `;
  }

  if (environment == 'production') {
    const object = {};
    const moduleContent = await prepareModuleContent();
    object[`vue-routes-loader-${appName}`] = moduleContent;
    return object;
  }
  if (environment == 'development') {
    return ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.startsWith(`/@modules/vue-routes-loader-${appName}`)) {
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

  function prepareRoute(route, plugin) {
    const keys = Object.keys(route);
    const prepared = keys.map((key) => {
      if (key == 'component') {
        const resolvedComponent = resolveComponentPath(route[key], plugin);
        return `${key}: () => import('${resolvedComponent}')`;
      } else if (typeof route[key] == 'object') {
        let resolvedObject = '';
        if (Array.isArray(route[key])) {
          resolvedObject = resolveArray(route[key], plugin);
        } else {
          resolvedObject = resolveObject(route[key], plugin);
        }
        return `${key}: ${resolvedObject}`;
      } else {
        return `${key}: '${route[key]}'`;
      }
    });
    return prepared;
  }

  function resolveObject(object, plugin) {
    const keyValuePairs = Object.keys(object).map((key) => {
      if (key == 'component') {
        const resolvedComponent = resolveComponentPath(object[key], plugin);
        return `${key}: () => import('${resolvedComponent}')`;
      }
      switch (typeof object[key]) {
        case 'string':
          return `${key}: '${object[key]}'`;

        case 'number':
          return `${key}: ${object[key]}`;

        case 'object':
          if (Array.isArray(object[key])) {
            return `${key}: ${resolveArray(object[key], plugin)}`;
          } else {
            return `${key}: ${resolveObject(object[key], plugin)}`;
          }
      }
    });
    return `{
      ${keyValuePairs}
    }`;
  }

  function resolveArray(array, plugin) {
    const resolved = array.map((single) => {
      switch (typeof single) {
        case 'string':
          return `'${single}'`;

        case 'object':
          if (Array.isArray(single)) {
            return `${resolveArray(single, plugin)}`;
          } else {
            return `${resolveObject(single, plugin)}`;
          }
      }
    });
    return `[${resolved}]`;
  }

  function resolveComponentPath(component, plugin) {
    const path = require('path');
    return path.resolve(`/~plugins/${plugin}/${appName}/`, component);
  }
};
