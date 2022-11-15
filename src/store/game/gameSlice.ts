import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Message } from './types';
import { GameError } from '../../common/types';

export interface GameState {
  activeGame?: Game;
  gameCanceled?: boolean;
  errors: { [key: string]: string };
  chat: Message[];
}

const initialState: GameState = {
  chat: [],
  errors: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
} = gameSlice.actions;
