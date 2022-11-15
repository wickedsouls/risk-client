import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';
import { HttpResponseError } from '../../common/types';
import { logout } from '../auth';

export interface UserState {
  data: Partial<User>;
  isLoading?: boolean;
  error?: HttpResponseError;
}

const initialState: UserState = {
  data: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<{ id: string }>) => {
      state.isLoading = true;
    },
    getUserDone: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    getUserFailed: (state, action: PayloadAction<HttpResponseError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.data = {};
    });
  },
});

export const { getUser, getUserDone, getUserFailed } = userSlice.actions;
