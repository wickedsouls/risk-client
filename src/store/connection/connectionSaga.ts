import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { authenticate, logout } from '../auth';
import { store } from '../index';
import { ActionCreator, AnyAction } from 'redux';
import { GameError } from '../../common/types';
import { gameEventEmitter } from './gameEventEmitter';
import { gameEventReceiver } from './gameEventReceiver';
import { setConnected } from '../app';

function connect(token: string | null) {
  const socket = io('http://192.168.1.154:9000/game', { auth: { token } });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      console.log('Connected. Socket ID: ', socket.id);
      resolve(socket);
    });
  });
}

function* readData(socket: Socket): Generator<any, any, any> {
  const channel = yield call(gameEventReceiver, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export const dispatchData = <T>(
  data: T | GameError | undefined,
  successAction: ActionCreator<AnyAction>,
  failedAction: ActionCreator<AnyAction>,
) => {
  if (data instanceof Object && 'error' in data) {
    store.dispatch(failedAction(data));
  } else {
    store.dispatch(successAction(data));
  }
};

function* handleIO(socket: Socket) {
  yield fork(readData, socket);
  yield fork(gameEventEmitter, socket);
}

export function* wsConnectionFlow(): Generator<any, any, any> {
  while (true) {
    const { payload: accessToken } = yield take(authenticate);
    const socket: Socket = yield call(connect, accessToken);
    if (socket) {
      store.dispatch(setConnected(true));
      yield put(setConnected(true));
    }
    const task = yield fork(handleIO, socket);
    yield take(logout);
    yield cancel(task);
    socket.disconnect();
  }
}
