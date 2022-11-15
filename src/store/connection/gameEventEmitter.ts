import { ClientSocket } from './types';
import { all, takeEvery } from 'redux-saga/effects';
import {
  createGame,
  createGameDone,
  createGameFailed,
  getAllGames,
  getAllGamesDone,
} from '../main-room';
import {
  cancelGame,
  joinGame,
  joinGameDone,
  joinGameFailed,
  leaveGame,
  Message,
  sendMessage,
} from '../game';
import { Game } from '../game';
import { store } from '../index';
import values from 'lodash.values';
import { dispatchData } from './connectionSaga';
import { GameError } from '../../common/types';
import { logData } from '../../utils/logData';

export function* gameEventEmitter(socket: ClientSocket) {
  yield all([
    takeEvery(joinGame, (action: ReturnType<typeof joinGame>) => {
      const { gameId, password } = action.payload;
      logData(action);
      socket.emit('request/JOIN_GAME', { gameId, password }, (data) => {
        logData(data);
        dispatchData<{ game: Game; chat: Message[] } | GameError>(
          data,
          joinGameDone,
          joinGameFailed,
        );
      });
    }),
    takeEvery(createGame, (action: ReturnType<typeof createGame>) => {
      logData(action);
      socket.emit('request/CREATE_GAME', action.payload, (data) => {
        logData(data);
        dispatchData<Game>(data, createGameDone, createGameFailed);
      });
    }),
    takeEvery(getAllGames, () => {
      socket.emit('request/GET_ALL_GAMES', null, (data) => {
        logData(data);
        store.dispatch(getAllGamesDone(values(data)));
      });
    }),
    takeEvery(leaveGame, (action: ReturnType<typeof leaveGame>) => {
      const { gameId } = action.payload;
      socket.emit('request/LEAVE_GAME', { gameId });
    }),
    takeEvery(sendMessage, (action: ReturnType<typeof sendMessage>) => {
      logData(action);
      socket.emit('request/SEND_MESSAGE', { message: action.payload.message });
    }),
    takeEvery(cancelGame, (action: ReturnType<typeof cancelGame>) => {
      logData(action);
      socket.emit('request/CANCEL_GAME', { gameId: action.payload.gameId });
    }),
  ]);
}
