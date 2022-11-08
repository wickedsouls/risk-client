import { browserStorage, StorageKey } from './browserStorage';
import { store } from '../store';
import { authenticate } from '../store/auth';
import jwtDecode from 'jwt-decode';
import { UserPayload } from '../store/user/types';

export const authenticateUser = () => {
  const accessToken = browserStorage.getItem(StorageKey.ACCESS_TOKEN);
  if (accessToken) {
    store.dispatch(authenticate());
  }
};
