import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from './types';
import { createGame } from '../main-room';
import { joinGameDone } from '../game';

export interface AppState {
  modal?: ModalType;
  connected?: boolean;
}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame, (state) => {
      state.modal = undefined;
    });
    builder.addCase(joinGameDone, (state) => {
      state.modal = undefined;
    });
  },
});

export const { openModal, closeModal, setConnected } = appSlice.actions;
