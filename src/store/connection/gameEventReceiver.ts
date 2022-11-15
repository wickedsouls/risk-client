import { ClientSocket } from './types';
import { eventChannel } from 'redux-saga';
import values from 'lodash.values';
import { cancelGameDone, Game } from '../game';
import { getAllGamesDone } from '../main-room';
import { updateGame, receiveMessage } from '../game';
import { setConnected } from '../app';

export function gameEventReceiver(socket: ClientSocket) {
  return eventChannel((emit) => {
    socket.on('set/GAMES', (data) => {
      const games = values<Game>(data);
      emit(getAllGamesDone(games));
    });
    socket.on('set/JOIN_GAME', (data) => {
      emit(updateGame(data));
    });
    socket.on('set/LEAVE_GAME', (data) => {
      emit(updateGame(data));
    });
    socket.on('set/MESSAGES', (data) => {
      emit(receiveMessage(data));
    });
    socket.on('set/CANCEL_GAME', () => {
      emit(cancelGameDone());
    });
    socket.on('disconnect', () => {
      console.warn('disconnected');
      emit(setConnected(false));
    });
    return () => null;
  });
}
