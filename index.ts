import Kikimore from './kikimore/kikimore';
import config from './config';

const kikimore = new Kikimore({
  databaseName: 'kikimore',
  databaseUrl:  config.mongoUrl,
  port: config.port,
  api: {
    path: '/api',
  },
  admin: {
    path: '/admin',
  },
  frontend: {},
  plugins: ['user', 'client', 'contract', 'admin_ui', 'rate'],
});

kikimore.start();
