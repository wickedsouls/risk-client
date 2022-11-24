import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Message } from './types';
import { GameError } from '../../common/types';
import { ModalType } from '../app';
import { checkIfContinentWasTaken, checkIfPlayerLost } from './utils';

export interface GameState {
  activeGame?: Game;
  gameCanceled?: boolean;
  errors: { [key: string]: string };
  chat: Message[];
  gameModal: {
    type?: ModalType;
    [key: string]: string | number | undefined;
  };
  interactions: {
    zoneFrom?: string;
    zoneTo?: string;
    zoneSelected?: string;
  };
}

const initialState: GameState = {
  chat: [],
  gameModal: {},
  errors: {},
  interactions: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    showGameModal: (
      state,
      action: PayloadAction<{
        type?: ModalType;
        message?: string;
        title?: string;
      }>,
    ) => {
      state.gameModal = action.payload;
    },
    clearActiveGame: (state) => {
      state.activeGame = undefined;
      state.chat = [];
      state.interactions = {};
    },
    joinGame: (
      state,
      action: PayloadAction<{ gameId: string; password?: string }>,
    ) => {
      state.errors = {};
    },
    joinGameDone: (
      state,
      action: PayloadAction<{ game: Game; chat: Message[] }>,
    ) => {
      state.gameCanceled = false;
      state.activeGame = action.payload.game;
      state.chat = action.payload.chat;
    },
    joinGameFailed: (state, action: PayloadAction<GameError>) => {
      state.errors = { joinGame: action.payload.message };
    },
    updateGame: (state, action: PayloadAction<Game>) => {
      const taken = checkIfContinentWasTaken(
        state.activeGame?.map?.continents,
        action.payload.map?.continents,
      );
      const eliminated = checkIfPlayerLost(
        state.activeGame?.players,
        action.payload.players,
        state.activeGame?.turnState,
      );
      if (eliminated) {
        state.gameModal = {
          type: ModalType.Defeat,
          username: eliminated.username,
          playerId: eliminated.id,
          color: eliminated.color,
        };
      }
      if (taken && !eliminated) {
        const player = action.payload.players.find((p) => p.id === taken.owner);
        state.gameModal = {
          type: ModalType.ContinentTaken,
          continent: taken.name,
          username: player?.username,
          playerId: player?.id,
          color: player?.color,
          reward: taken.reward,
        };
      }
      state.activeGame = action.payload;
    },
    leaveGame: (state, action: PayloadAction<{ gameId: string }>) => {
      state.activeGame = undefined;
    },
    sendMessage: (state, action: PayloadAction<{ message: string }>) => {
      null;
    },
    cancelGame: (state, action: PayloadAction<{ gameId: string }>) => {
      null;
    },
    cancelGameDone: (state) => {
      state.gameCanceled = true;
      state.errors = {};
      state.chat = [];
    },
    clearGames: (state) => {
      state.activeGame = undefined;
      state.gameCanceled = true;
      state.errors = {};
      state.chat = [];
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.chat.push(action.payload);
    },
    startGame: (state, action: PayloadAction<{ gameId: string }>) => {
      null;
    },
    startGameDone: (state, action: PayloadAction<Game>) => {
      state.activeGame = action.payload;
      state.errors = {};
    },
    startGameFailed: (state, action: PayloadAction<GameError>) => {
      state.errors = { startGame: action.payload.message };
    },
    getGameInfo: (state, action: PayloadAction<{ gameId: string }>) => {
      null;
    },
    getGameInfoDone: (
      state,
      action: PayloadAction<{ game: Game; chat: Message[] }>,
    ) => {
      state.activeGame = action.payload.game;
      state.chat = action.payload.chat;
    },
    getGameInfoFailed: (state, action: PayloadAction<GameError>) => {
      state.errors = { gameInfo: action.payload.message };
    },
    endTurn: (state, action: PayloadAction<{ gameId: string }>) => {
      null;
    },
    placeArmies: (state, action: PayloadAction<{ zone: string }>) => {
      state.interactions.zoneSelected = action.payload.zone;
    },
    selectZoneFrom: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneFrom = action.payload.zone;
    },
    selectZoneTo: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneTo = action.payload.zone;
    },
    selectZone: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneSelected = action.payload.zone;
    },
    updateZoneFrom: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneFrom = action.payload.zone;
    },
    updateZoneTo: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneTo = action.payload.zone;
    },
    updateZoneSelected: (state, action: PayloadAction<{ zone?: string }>) => {
      state.interactions.zoneSelected = action.payload.zone;
    },
    attackPlayer: (
      state,
      action: PayloadAction<{
        zoneFrom: string;
        zoneTo: string;
        amount: number;
      }>,
    ) => {
      null;
    },
    moveArmy: (
      state,
      action: PayloadAction<{
        zoneFrom: string;
        zoneTo: string;
        amount: number;
      }>,
    ) => {
      null;
    },
    finishAttack: () => {
      null;
    },
    surrender: (state) => {
      state.activeGame = undefined;
      state.chat = [];
    },
  },
});

export const {
  joinGameDone,
  joinGameFailed,
  joinGame,
  updateGame,
  leaveGame,
  sendMessage,
  receiveMessage,
  cancelGame,
  cancelGameDone,
  clearGames,
  startGame,
  startGameFailed,
  startGameDone,
  getGameInfo,
  getGameInfoFailed,
  getGameInfoDone,
  endTurn,
  placeArmies,
  selectZoneFrom,
  selectZoneTo,
  updateZoneTo,
  updateZoneFrom,
  attackPlayer,
  finishAttack,
  moveArmy,
  updateZoneSelected,
  selectZone,
  showGameModal,
  clearActiveGame,
  surrender,
} = gameSlice.actions;
