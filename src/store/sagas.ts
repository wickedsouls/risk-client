import { all } from 'redux-saga/effects';
import { userSaga } from './user';
import { authSaga } from './auth';

export function* rootSaga() {
  yield all([userSaga(), authSaga()]);
}
