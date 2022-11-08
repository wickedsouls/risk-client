import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actions from './userActions';
import { formatHttpResponseError } from '../../utils/formatResponseError';
import { AxiosResponse } from 'axios';
import { UserPayload } from './types';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiEndpoints';

function* getUser(action: ReturnType<typeof actions.getUser.request>) {
  const { id } = action.payload;
  try {
    const { data }: AxiosResponse<UserPayload> = yield call(
      axios.get,
      apiEndpoints.userById(id),
    );
    yield put(actions.getUser.success(data));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(actions.getUser.failure(err));
  }
}

export function* userSaga() {
  yield all([takeLatest(actions.getUser.request, getUser)]);
}
