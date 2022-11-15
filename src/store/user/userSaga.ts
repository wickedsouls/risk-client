import { all, put, call, takeLatest } from 'redux-saga/effects';
import { formatHttpResponseError } from '../../utils/formatResponseError';
import { AxiosResponse } from 'axios';
import { User } from './types';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiEndpoints';
import { getUser, getUserDone, getUserFailed } from './userSlice';

function* getUserRequest(action: ReturnType<typeof getUser>) {
  const { id } = action.payload;
  try {
    const { data }: AxiosResponse<User> = yield call(
      axios.get,
      apiEndpoints.userById(id),
    );
    yield put(getUserDone(data));
  } catch (e) {
    const err = formatHttpResponseError(e);
    yield put(getUserFailed(err));
  }
}

export function* userSaga() {
  yield all([takeLatest(getUser, getUserRequest)]);
}
