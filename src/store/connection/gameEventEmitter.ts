import { ClientSocket } from './types';
import { all, take, takeEvery } from 'redux-saga/effects';
import {
  createGame,
  createGameDone,
  createGameFailed,
  getAllGames,
  getAllGamesDone,
} from '../main-room';
import {
  attackPlayer,
  cancelGame,
  endTurn,
  finishAttack,
  getGameInfo,
  getGameInfoDone,
  getGameInfoFailed,
  joinGame,
  joinGameDone,
  joinGameFailed,
  leaveGame,
  Message,
  moveArmy,
  placeArmies,
  selectZoneFrom,
  selectZoneTo,
  sendMessage,
  startGame,
  startGameDone,
  startGameFailed,
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
      socket.emit('request/JOIN_GAME', { gameId, password }, (data) => {
        dispatchData<{ game: Game; chat: Message[] } | GameError>(
          data,
          joinGameDone,
          joinGameFailed,
        );
      });
    }),
    takeEvery(createGame, (action: ReturnType<typeof createGame>) => {
      socket.emit('request/CREATE_GAME', action.payload, (data) => {
        logData(data);
        dispatchData<Game>(data, createGameDone, createGameFailed);
      });
    }),
    takeEvery(getAllGames, () => {
      socket.emit('request/GET_ALL_GAMES', null, (data) => {
        store.dispatch(getAllGamesDone(values(data)));
      });
    }),
    takeEvery(leaveGame, (action: ReturnType<typeof leaveGame>) => {
      const { gameId } = action.payload;
      socket.emit('request/LEAVE_GAME', { gameId });
    }),
    takeEvery(sendMessage, (action: ReturnType<typeof sendMessage>) => {
      socket.emit('request/SEND_MESSAGE', { message: action.payload.message });
    }),
    takeEvery(cancelGame, (action: ReturnType<typeof cancelGame>) => {
      socket.emit('request/CANCEL_GAME', { gameId: action.payload.gameId });
    }),
    takeEvery(startGame, (action: ReturnType<typeof startGame>) => {
      socket.emit(
        'request/START_GAME',
        { gameId: action.payload.gameId },
        (data) => {
          dispatchData<Game>(data, startGameDone, startGameFailed);
        },
      );
    }),
    takeEvery(getGameInfo, (action: ReturnType<typeof getGameInfo>) => {
      socket.emit('request/GET_GAME_INFO', action.payload, (data) => {
        dispatchData<{ game: Game; chat: Message[] }>(
          data,
          getGameInfoDone,
          getGameInfoFailed,
        );
      });
    }),
    takeEvery(endTurn, (action: ReturnType<typeof endTurn>) => {
      socket.emit(
        'request/END_TURN',
        { gameId: action.payload.gameId },
        (data) => {
          console.log(data);
        },
      );
    }),
    takeEvery(placeArmies, (action: ReturnType<typeof placeArmies>) => {
      const { zone } = action.payload;
      socket.emit('request/PLACE_ARMIES', { zone, amount: 1 }, (err) =>
        console.log(err),
      );
    }),
    takeEvery(selectZoneFrom, (action: ReturnType<typeof selectZoneFrom>) => {
      socket.emit('request/SELECT_ZONE_FROM', { zone: action.payload.zone });
    }),
    takeEvery(selectZoneTo, (action: ReturnType<typeof selectZoneTo>) => {
      socket.emit('request/SELECT_ZONE_TO', { zone: action.payload.zone });
    }),
    takeEvery(attackPlayer, (action: ReturnType<typeof attackPlayer>) => {
      socket.emit('request/ATTACK_PLAYER', action.payload, (err) => {
        console.log(err);
      });
    }),
    takeEvery(moveArmy, (action: ReturnType<typeof moveArmy>) => {
      socket.emit('request/MOVE_ARMY', action.payload, (err) => {
        console.log(err);
      });
    }),
    takeEvery(finishAttack, () => {
      socket.emit('request/FINISH_ATTACK');
    }),
  ]);
}
