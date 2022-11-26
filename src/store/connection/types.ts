import { Socket } from 'socket.io-client';
import { Game, Message } from '../game';
import { GameError } from '../../common/types';

export interface ServerToClientEvents {
  // Registration / PreparationGameplay
  'set/GAMES': (payload: { [key: string]: Game }) => void;
  'set/CREATE_GAME': (payload: { [key: string]: Game }) => void;
  'set/JOIN_GAME': (payload: Game) => void;
  'set/START_GAME': (payload: Game) => void;
  'set/LEAVE_GAME': (payload: Game) => void;
  'set/MESSAGE': (payload: Message) => void;
  'set/MESSAGES': (payload: Message[]) => void;
  'set/CANCEL_GAME': (payload: { gameId: string }) => void;
  // Gameplay
  'set/UPDATE_GAME': (payload: Game) => void;
  'set/SELECT_ZONE_FROM': (payload: { zone?: string }) => void;
  'set/SELECT_ZONE_TO': (payload: { zone?: string }) => void;
  'set/SELECT_ZONE': (payload: { zone?: string }) => void;
}

export interface ClientToServerEvents {
  // Registration / PreparationGameplay
  'request/GET_ALL_GAMES': (
    payload: null,
    ack: (data: { [key: string]: Game }) => void,
  ) => void;
  'request/GET_GAME_INFO': (
    payload: { gameId: string },
    ack: (data: { game: Game; chat: Message[] } | GameError) => void,
  ) => void;
  'request/CREATE_GAME': (
    payload: { password?: string; isPrivate?: boolean },
    ack: (data: Game | GameError) => void,
  ) => void;
  'request/JOIN_GAME': (
    payload: { gameId: string; password?: string },
    ack: (data: { game: Game; chat: Message[] } | GameError) => void,
  ) => void;
  'request/START_GAME': (
    payload: { gameId: string },
    ack: (data: Game | GameError) => void,
  ) => void;
  'request/LEAVE_GAME': () => void;
  'request/SEND_MESSAGE': (payload: { message: string }) => void;
  'request/CANCEL_GAME': (payload: { gameId: string }) => void;
  // Gameplay
  'request/END_TURN': (ack: (data: Game | GameError) => void) => void;
  'request/PLACE_ARMIES': (
    payload: { zone: string; amount: number },
    ack: (data: GameError) => void,
  ) => void;
  'request/ATTACK_PLAYER': (
    payload: { zoneFrom: string; zoneTo: string; amount: number },
    ack: (data: GameError) => void,
  ) => void;
  'request/MOVE_ARMY': (
    payload: { zoneFrom: string; zoneTo: string; amount: number },
    ack: (data: GameError) => void,
  ) => void;
  'request/SELECT_ZONE_FROM': (payload: { zone?: string }) => void;
  'request/SELECT_ZONE_TO': (payload: { zone?: string }) => void;
  'request/FINISH_ATTACK': () => void;
  'request/SURRENDER': () => void;
  'request/USE_CARDS': () => void;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
