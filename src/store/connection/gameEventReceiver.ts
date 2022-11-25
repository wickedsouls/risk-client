import { ClientSocket } from './types';
import { eventChannel } from 'redux-saga';
import values from 'lodash.values';
import {
  cancelGameDone,
  updateGame,
  receiveMessage,
  Game,
  startGameDone,
  selectZoneFrom,
  updateZoneFrom,
  updateZoneTo,
  updateZoneSelected,
  receiveMessages,
} from '../game';
import { getAllGamesDone } from '../main-room';
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
    socket.on('set/MESSAGE', (data) => {
      emit(receiveMessage(data));
    });
    socket.on('set/MESSAGES', (data) => {
      emit(receiveMessages(data));
    });
    socket.on('set/CANCEL_GAME', () => {
      emit(cancelGameDone());
    });
    socket.on('set/START_GAME', (data) => {
      emit(startGameDone(data));
    });
    socket.on('set/UPDATE_GAME', (data) => {
      emit(updateGame(data));
    });
    socket.on('set/SELECT_ZONE_FROM', (data) => {
      emit(updateZoneFrom(data));
    });
    socket.on('set/SELECT_ZONE_TO', (data) => {
      emit(updateZoneTo(data));
    });
    socket.on('set/SELECT_ZONE', (data) => {
      emit(updateZoneSelected(data));
    });
    socket.on('disconnect', () => {
      console.warn('disconnected');
      emit(setConnected(false));
    });
    return () => null;
  });
}
