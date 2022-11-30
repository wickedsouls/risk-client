import { all, delay, put, select, takeLatest } from 'redux-saga/effects';
import {
  botAttackSuccess,
  onBotAttack,
  showGameModal,
  updateGame,
} from './gameSlice';
import { userState } from '../user';
import { PlayerStatus } from './types';
import { ModalType } from '../app';

function* botAttack(action: ReturnType<typeof onBotAttack>) {
  const { game, chat } = action.payload;
  const user = userState(yield select());
  yield delay(2000);
  yield put(botAttackSuccess({ map: game.map!, chat }));
  yield delay(2000);
  const myPlayer = game.players.find((player) => player.id === user.data.id);
  yield put(updateGame(action.payload.game));
  console.log('pyplayer', myPlayer);
  if (myPlayer && myPlayer.status === PlayerStatus.Defeat) {
    const { id, color, username } = myPlayer;
    yield put(
      showGameModal({ type: ModalType.Defeat, username, playerId: id, color }),
    );
  }
}

export function* gameSaga() {
  yield all([takeLatest(onBotAttack, botAttack)]);
}
