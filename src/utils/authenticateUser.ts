import { browserStorage, StorageKey } from './browserStorage';
import { store } from '../store';
import { authenticate } from '../store/auth';
import { authHeaders } from './authHeaders';

export const authenticateUser = () => {
  const accessToken = browserStorage.getItem(StorageKey.ACCESS_TOKEN);
  if (accessToken) {
    authHeaders.set(accessToken);
    store.dispatch(authenticate(accessToken));
  }
};
