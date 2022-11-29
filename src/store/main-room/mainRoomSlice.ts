import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../game';
import { CreateGame } from './types';
import { GameError } from '../../common/types';

export interface MainRoomState {
  games: {
    isLoading?: boolean;
    error?: string;
    data: Game[];
  };
  create: {
    isLoading?: boolean;
    success?: boolean;
    error?: string;
  };
}

const initialState: MainRoomState = {
  games: {
    data: [],
  },
  create: {},
};

export const mainRoomSlice = createSlice({
  name: 'mainRoom',
  initialState,
  reducers: {
    getAllGames: (state) => {
      state.games.isLoading = true;
    },
    getAllGamesDone: (state, action: PayloadAction<Game[]>) => {
      state.games.isLoading = false;
      state.games.data = action.payload;
    },
    createGame: (state, action: PayloadAction<CreateGame>) => {
      state.create.isLoading = true;
    },
    createGameFailed: (state, action: PayloadAction<GameError>) => {
      state.create.isLoading = false;
      state.create.error = action.payload.message;
    },
    createGameDone: (state, action: PayloadAction<Game>) => {
      state.create.isLoading = false;
      state.create.error = undefined;
      state.create.success = true;
    },
  },
});

export const {
  getAllGames,
  getAllGamesDone,
  createGame,
  createGameDone,
  createGameFailed,
} = mainRoomSlice.actions;
