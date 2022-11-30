import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { apiEndpoints } from '../../config/apiEndpoints';
import { formatHttpResponseError } from '../../utils/formatResponseError';
import { LoginResponse, RegistrationResponse } from './types';
import { browserStorage, StorageKey } from '../../utils/browserStorage';
import { authHeaders } from '../../utils/authHeaders';
import {
  login,
  register,
  logout,
  registerDone,
  registerFailed,
  loginFailed,
  loginDone,
  authenticate,
} from './';

function* registerRequest(action: ReturnType<typeof register>) {
  try {
    const { data }: AxiosResponse<RegistrationResponse> = yield call(
      axios.post,
      apiEndpoints.register,
      action.payload,
    );
    const { accessToken } = data;
    authHeaders.set(accessToken);
    browserStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    yield put(registerDone());
    yield put(authenticate(accessToken));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(registerFailed(err));
  }
}

function* loginRequest(action: ReturnType<typeof login>) {
  try {
    const { data }: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      apiEndpoints.login,
      action.payload,
    );
    const { accessToken } = data;
    authHeaders.set(accessToken);
    browserStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    yield put(loginDone());
    yield put(authenticate(accessToken));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(loginFailed(err));
  }
}

function logoutRequest() {
  browserStorage.deleteItem(StorageKey.ACCESS_TOKEN);
  authHeaders.delete();
}

export function* authSaga() {
  yield all([
    takeLatest(register, registerRequest),
    takeLatest(login, loginRequest),
    takeLatest(logout, logoutRequest),
  ]);
}
