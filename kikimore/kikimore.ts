import mongoose from 'mongoose';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import { createServer, build } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import loadVueRoutes from './vite/vue-routes-loader';
import loadVueRouterFunctions from './vite/vue-router-functions';
import loadStores from './vite/stores-loader';
import watchApi from './vite/api-watcher';
import virtual from '@rollup/plugin-virtual';

export class Kikimore {
  databaseName: string;
  databaseUrl: string;
  mongoose: any;
  graphql: any;
  express: any;
  api: any;
  port: any;
  plugins: any;
  pluginsPath: any;
  path: any;
  environment: string;
  frontend: any;
  admin: any;
  eventEmitter: any;

  constructor(options) {
    // Misc
    this.path = require('path');
    this.port = (options && options.port) || 3000;
    this.environment = process.argv.includes('--dev')
      ? 'development'
      : 'production';
    if (options && typeof options.plugins != 'undefined') {
      this.plugins = options.plugins;
      this.pluginsPath = this.path.resolve(__dirname, '../plugins');
    }

    // Database
    this.databaseName = options.databaseName;
    this.databaseUrl = options.databaseName
      ? options.databaseName
      : 'localhost';
    this.mongoose = mongoose;

    // API
    this.graphql = {
      server: {},
      typeDefs: `
        type Query ""
        type Mutation ""
      `,
      resolvers: {
        Query: {},
        Mutation: {},
      },
    };
    this.express = express();
    if (typeof options.api !== 'undefined') {
      this.api = {
        path: options.api.path ? options.api.path : '/api',
      };
    } else {
      this.api = null;
    }
    // Frontend
    if (typeof options.frontend !== 'undefined') {
      this.frontend = {
        path: '/',
        routes: [],
        router: [],
        stores: {},
      };
    } else {
      this.frontend = null;
    }

    // Admin
    if (typeof options.admin !== 'undefined') {
      this.admin = {
        path: options.admin.path ? options.admin.path : '/admin',
        routes: [],
        router: [],
        stores: {},
      };
    } else {
      this.admin = null;
    }

    // Event emmiter
    const events = require('events');
    this.eventEmitter = new events.EventEmitter();
  }

  /**
   * Connect to mongo database
   */
  async connectDatabase() {
    const uri = `mongodb://${this.databaseUrl}:27017/${this.databaseName}`;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await this.mongoose.connect(uri, options).catch((err) => {
      console.log(err);
      console.error(
        '1001: MongoDB unavailable, please first install MongoDB before proceeding',
      );
    });
    console.log(`Database \x1b[32m${this.databaseName}\x1b[0m connected!`);
    return;
  }

  /**
   * GraphQl API
   */
  async initializeApi() {
    const path = this.api.path;
    const schema = makeExecutableSchema({
      typeDefs: gql(`${this.graphql.typeDefs}`),
      resolvers: this.graphql.resolvers,
    });

    // @TODO Typescript
    this.graphql.server = new ApolloServer({
      gateway: {
        // @ts-ignore
        load: async () => ({
          schema: schema,
          executor: (args) => {
            // @ts-ignore
            execute({
              ...args,
              schmea: schema,
              contextValue: args.context,
              variableValues: args.request.variables,
            });
          },
        }),
        onSchemaChange: (callback) => {
          this.eventEmitter.on('schema_update', callback);
          return () => this.eventEmitter.off('schema_update', callback);
        },
      },
      subscriptions: false,
    });
    this.graphql.server.applyMiddleware({ app: this.express, path });
    console.log(`\x1b[32mAPI\x1b[0m is running`);
    return;
  }

  /**
   * Reload GraphQL API
   */
  async updateApiSchema() {
    this.graphql.typeDefs = `
      type Query ""
      type Mutation ""
    `;
    const resolvedPlugins = await this.resolvePlugins();
    resolvedPlugins.forEach((plugin: any) => {
      if (typeof plugin.api !== 'undefined') {
        // Load type definitions and resolvers for GraphQL API
        this.loadTypeDefsAndResolvers(plugin.api);
      }
    });
    const schema = makeExecutableSchema({
      typeDefs: gql(`${this.graphql.typeDefs}`),
      resolvers: this.graphql.resolvers,
    });

    this.eventEmitter.emit('schema_update', schema);
  }

  /**
   * Resolve plugins
   */
  async resolvePlugins() {
    const paths = this.plugins;
    const promises = await paths.map(async (pluginName) => {
      const pluginPath = this.path.join(
        __dirname,
        `./../plugins/${pluginName}`,
      );
      Object.keys(require.cache).forEach((key) => {
        if (key.includes(`plugins/${pluginName}`) && key.includes('.ts')) {
          delete require.cache[key];
        }
      });
      const requiredPlugin = await require(pluginPath).default;
      return {
        name: pluginName,
        ...requiredPlugin,
      };
    });
    const plugins = await Promise.all(promises);
    return plugins;
  }

  /**
   * Load Type defs and resolvers for GraphQL
   */
  loadTypeDefsAndResolvers(api) {
    if (typeof api.typeDef !== 'undefined') {
      this.graphql.typeDefs += `${api.typeDef} \n`;
    }
    if (typeof api.resolver !== 'undefined') {
      Object.keys(api.resolver).forEach((key) => {
        Object.keys(api.resolver[key]).forEach((fn) => {
          if (typeof this.graphql.resolvers[key] == 'undefined') {
            this.graphql.resolvers[key] = {};
          }
          this.graphql.resolvers[key][fn] = api.resolver[key][fn];
        });
      });
    }
  }

  /**
   * Load Plugins
   */
  async loadPlugins() {
    const resolvedPlugins = await this.resolvePlugins();
    resolvedPlugins.forEach((plugin: any) => {
      if (typeof plugin.api !== 'undefined') {
        // Load type definitions and resolvers for GraphQL API
        this.loadTypeDefsAndResolvers(plugin.api);
      }
      if (typeof plugin.admin !== 'undefined' && this.admin) {
        // Load admin routes
        if (typeof plugin.admin.routes !== 'undefined') {
          this.admin.routes.push(plugin.name);
          // Load admin stores
          const routesWithState = plugin.admin.routes.filter(
            (route) => typeof route.store !== 'undefined',
          );
          if (routesWithState.length) {
            this.admin.stores[plugin.name] = {};
            routesWithState.forEach((route) => {
              Object.keys(route.store).forEach((key) => {
                this.admin.stores[plugin.name][key] = route.store[key];
              });
            });
          }
        }
        // Load admin vue router functions
        if (typeof plugin.admin.router !== 'undefined') {
          this.admin.router.push(plugin.name);
        }
      }
      if (typeof plugin.frontend !== 'undefined' && this.frontend) {
        // Load frontend routes
        if (typeof plugin.frontend.routes !== 'undefined') {
          this.frontend.routes.push(plugin.name);
          // Load frontend stores
          const routesWithState = plugin.frontend.routes.filter(
            (route) => typeof route.store !== 'undefined',
          );
          if (routesWithState.length) {
            this.frontend.stores[plugin.name] = {};
            routesWithState.forEach((route) => {
              Object.keys(route.store).forEach((key) => {
                this.frontend.stores[plugin.name][key] = route.store[key];
              });
            });
          }
        }
        // Load frontend vue router functions
        if (typeof plugin.frontend.router !== 'undefined') {
          this.frontend.router.push(plugin.name);
        }
      }
      // Load Express middlewares
      if (
        typeof plugin.server !== 'undefined' &&
        typeof plugin.server.middlewares !== 'undefined'
      ) {
        this.loadMiddlewaresFromPlugin(plugin.server.middlewares);
      }
    });
  }

  /**
   * Start Express server
   */
  async startServer() {
    const running: any = {};
    if (this.api) {
      running.API = {
        URL: `http://localhost:${this.port}${this.api.path}`,
      };
    }
    if (this.admin) {
      running.Admin = {
        URL: `http://localhost:${this.port}${this.admin.path}`,
      };
    }
    if (this.frontend) {
      running.Frontend = {
        URL: `http://localhost:${this.port}${this.frontend.path}`,
      };
    }
    if (this.isDevelopment()) {
      await this.addExpressProxies();
    }
    this.express.listen(this.port, console.table(running));
  }

  /**
   * Load Express middlewares from plugin
   */
  loadMiddlewaresFromPlugin(middlewares) {
    Object.keys(middlewares).forEach((key) => {
      if (typeof middlewares[key] == 'function') {
        this.express.use(middlewares[key]);
      }
    });
  }

  /**
   * Add Express middlewares
   */
  async addExpressProxies() {
    if (this.admin) {
      this.express.use(
        createProxyMiddleware(
          (pathname, req) => {
            if (pathname.includes('admin')) {
              return true;
            } else if (pathname == '/vite/client') {
              return req.headers.referer.includes('admin');
            } else if (pathname.includes('modules')) {
              if (req.headers.referer.includes('admin')) {
                return true;
              } else {
                return pathname.includes('@vue');
              }
            } else {
              return false;
            }
          },
          {
            target: 'http://localhost:8080',
            logLevel: 'warn',
          },
        ),
      );
    }
    if (this.frontend) {
      this.express.use(
        createProxyMiddleware({
          target: 'http://localhost:8081',
          logLevel: 'warn',
        }),
      );
    }
  }

  /**
   * Start Vite development servers for Admin/Frontend app
   */
  async startDevServers() {
    const proxy = {};
    if (this.api) {
      proxy[
        `${this.api.path}`
      ] = `http://localhost:${this.port}${this.api.path}`;
    }
    if (this.frontend) {
      const configureServer = await this.getViteConfigureServer('frontend');
      const define = await this.getViteDefines('frontend');
      await this.createServer({
        root: 'frontend',
        port: 8081,
        proxy,
        configureServer,
        define,
        alias: {
          '/~frontend/': this.path.resolve(__dirname, 'frontend/src'),
          '/~plugins/': this.path.resolve(__dirname, '../plugins'),
          '/~composables/': this.path.resolve(__dirname, 'composables'),
        },
      });
    }
    if (this.admin) {
      const configureServer = await this.getViteConfigureServer('admin');
      const define = await this.getViteDefines('admin');
      await this.createServer({
        root: 'admin',
        port: 8080,
        proxy,
        configureServer,
        define,
        alias: {
          '/~admin/': this.path.resolve(__dirname, 'admin/src'),
          '/~plugins/': this.path.resolve(__dirname, '../plugins'),
          '/~composables/': this.path.resolve(__dirname, 'composables'),
        },
      });
    }
  }

  /**
   * Create Vite dev server
   */
  async createServer({
    root,
    port,
    proxy,
    configureServer = null,
    alias = null,
    define = null,
  }) {
    await createServer({
      root: `${process.cwd()}/kikimore/${root}`,
      proxy,
      configureServer,
      alias,
      define,
    }).listen(port);
  }

  /**
   * Get configureServer setup for vite
   */
  async getViteConfigureServer(appName) {
    const configureServer = [];
    // Vue routes
    const vueRoutes = await loadVueRoutes(
      appName,
      this[appName].routes,
      this.environment,
      this.pluginsPath,
    );
    configureServer.push(vueRoutes);

    // Vue router functions
    const vueRouterFunctions = await loadVueRouterFunctions(
      appName,
      this[appName].router,
      this.environment,
      this.pluginsPath,
    );
    configureServer.push(vueRouterFunctions);

    // Stores
    const stores = await loadStores(
      appName,
      this[appName].stores,
      this.environment,
      this.pluginsPath,
    );
    configureServer.push(stores);

    // @TODO check whic app we have and then use only on one
    if (appName == 'admin') {
      const watcher = await watchApi(this.pluginsPath, async () => {
        await this.updateApiSchema();
      });
      configureServer.push(watcher);
    }

    return configureServer;
  }

  /**
   * Get Define object for vite
   */
  async getViteDefines(appName) {
    const define = {};

    // Admin Path
    define['__ADMIN_PATH__'] = this.admin.path ? this.admin.path : '/admin';

    return define;
  }

  /**
   * Build for production
   */
  async buildForProduction() {
    if (this.admin) {
      console.log('Working on Admin app...');
      const configureServer = await this.getViteConfigureServer('admin');
      const plugins = configureServer.map((plugin) => virtual(plugin));
      const define = await this.getViteDefines('admin');
      await build({
        alias: {
          '/~admin/': this.path.resolve(__dirname, 'admin/src'),
          '/~plugins/': this.path.resolve(__dirname, '../plugins'),
          '/~composables/': this.path.resolve(__dirname, 'composables'),
        },
        base: '/admin',
        root: `${process.cwd()}/kikimore/admin`,
        outDir: this.path.join(__dirname, '../dist/admin'),
        rollupInputOptions: {
          plugins,
        },
        define,
      });
    }
    if (this.frontend) {
      console.log('Working on Frontend app...');
      const configureServer = await this.getViteConfigureServer('frontend');
      const plugins = configureServer.map((plugin) => virtual(plugin));
      const define = await this.getViteDefines('frontend');
      // Delete cache and require new build from vite because of cached postcss config
      Object.keys(require.cache).forEach(function (key) {
        if (key.includes('vite')) {
          delete require.cache[key];
        }
      });
      const { build } = require('vite');
      await build({
        alias: {
          '/~frontend/': this.path.resolve(__dirname, 'frontend/src'),
          '/~plugins/': this.path.resolve(__dirname, '../plugins'),
          '/~composables/': this.path.resolve(__dirname, 'composables'),
        },
        root: `${process.cwd()}/kikimore/frontend`,
        outDir: this.path.join(__dirname, '../dist/frontend'),
        rollupInputOptions: {
          plugins,
        },
        define,
      });
    }
  }

  /**
   * Start express static middlewares
   */
  async startStaticMiddlewares() {
    if (this.admin) {
      const staticFileMiddleware = express.static(
        this.path.join(__dirname, './../dist/admin'),
      );
      this.express.use('/admin', staticFileMiddleware);
      this.express.all(`${this.admin.path}(/)?*`, (req, res, next) => {
        try {
          return res.sendFile(
            this.path.join(__dirname, './../dist/admin/index.html'),
          );
        } catch (error) {
          return res.json({
            success: false,
            message: 'Something went wrong',
          });
        }
      });
    }
    if (this.frontend) {
      const staticFileMiddleware = express.static(
        this.path.join(__dirname, './../dist/frontend'),
      );
      this.express.use(staticFileMiddleware);
      this.express.all('*', (req, res, next) => {
        try {
          return res.sendFile(
            this.path.join(__dirname, './../dist/frontend/index.html'),
          );
        } catch (error) {
          return res.json({
            success: false,
            message: 'Something went wrong',
          });
        }
      });
    }
  }

  /**
   *  Main start function
   */
  async start() {
    if (this.plugins) {
      await this.loadPlugins();
    }
    if (this.databaseName) {
      await this.connectDatabase();
      await this.initializeApi();
    }
    if (this.isDevelopment()) {
      await this.startDevServers();
    } else {
      await this.buildForProduction();
      await this.startStaticMiddlewares();
    }

    this.startServer();
  }

  /**
   * HELPERS
   */

  /**
   * Check if environment is development
   */
  isDevelopment() {
    return this.environment == 'development';
  }
}

export default Kikimore;
