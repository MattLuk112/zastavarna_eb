import Kikimore from './kikimore/kikimore';

console.log(process.env.mongoUrl);

const kikimore = new Kikimore({
  databaseName: 'kikimore',
  databaseUrl: process.env.mongoUrl,
  port: process.env.port,
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
