import { reactive } from 'vue';

const menus = reactive({
  positions: {},
});

export function addToMenu(key, item) {
  if (typeof menus.positions[key] === 'undefined') {
    menus.positions[key] = [item];
  } else {
    menus.positions[key].push(item);
  }
  return;
}

export function getMenu(key) {
  return menus.positions[key];
}
