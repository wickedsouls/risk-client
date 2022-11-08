export enum StorageKey {
  ACCESS_TOKEN = 'access-token',
}

export const browserStorage = {
  setItem(key: StorageKey, item: string | number) {
    localStorage.setItem(
      key,
      typeof item === 'number' ? item.toString() : item,
    );
  },
  getItem(key: StorageKey) {
    return localStorage.getItem(key);
  },
  deleteItem(key: StorageKey) {
    localStorage.removeItem(key);
  },
};
