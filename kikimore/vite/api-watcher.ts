export default (pluginsPath, callback) => {
  return ({ app, watcher }) => {
    watcher.add(`${pluginsPath}/**/api/*`);
    watcher._events.change.push(async (path) => {
      if (path.includes('api')) {
        const part = path.split('/plugins/')[1];
        console.log(`\x1b[32m[api]\x1b[0m ../../plugins/${part} updated.`);
        await callback();
      }
    });
  };
};
