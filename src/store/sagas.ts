import { all } from 'redux-saga/effects';
import { userSaga } from './user';
import { authSaga } from './auth';
import { wsConnectionFlow } from './connection/connectionSaga';

export function* rootSaga() {
  yield all([userSaga(), authSaga(), wsConnectionFlow()]);
}
