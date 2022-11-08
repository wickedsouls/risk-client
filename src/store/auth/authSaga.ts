import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './authActions';
import axios, { AxiosResponse } from 'axios';
import { apiEndpoints } from '../../config/apiEndpoints';
import { formatHttpResponseError } from '../../utils/formatResponseError';
import { LoginResponse, RegistrationResponse } from './types';
import { browserStorage, StorageKey } from '../../utils/browserStorage';
import { clearUserData } from '../user';

function* register(action: ReturnType<typeof actions.register.request>) {
  try {
    const { data }: AxiosResponse<RegistrationResponse> = yield call(
      axios.post,
      apiEndpoints.register,
      action.payload,
    );
    const { accessToken } = data;
    browserStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    yield put(actions.register.success({ accessToken }));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(actions.register.failure(err));
  }
}

function* login(action: ReturnType<typeof actions.login.request>) {
  try {
    const { data }: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      apiEndpoints.login,
      action.payload,
    );
    const { accessToken } = data;
    browserStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    yield put(actions.login.success({ accessToken }));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(actions.login.failure(err));
  }
}

function* logout() {
  browserStorage.deleteItem(StorageKey.ACCESS_TOKEN);
  yield put(clearUserData());
}

export function* authSaga() {
  yield all([takeLatest(actions.register.request, register)]);
  yield all([takeLatest(actions.login.request, login)]);
  yield all([takeLatest(actions.logout, logout)]);
}
