import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HttpResponseError } from '../../common/types';
import { LoginPayload, RegistrationPayload } from './types';

export interface AuthState {
  isAuthenticated?: boolean;
  accessToken?: string;
  isGuest?: boolean;
  loginInProgress?: boolean;
  registrationInProgress?: boolean;
  loginError?: HttpResponseError;
  registrationError?: HttpResponseError;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loginInProgress = true;
    },
    loginDone: (state) => {
      state.loginInProgress = false;
      state.isAuthenticated = true;
      state.loginError = undefined;
    },
    loginFailed: (state, action: PayloadAction<HttpResponseError>) => {
      state.loginError = action.payload;
      state.loginInProgress = false;
    },
    register: (state, action: PayloadAction<RegistrationPayload>) => {
      state.registrationInProgress = true;
    },
    registerDone: (state) => {
      state.registrationInProgress = false;
      state.registrationError = undefined;
      state.isAuthenticated = true;
    },
    registerFailed: (state, action: PayloadAction<HttpResponseError>) => {
      state.registrationError = action.payload;
      state.registrationInProgress = false;
    },
    authenticate: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  login,
  loginDone,
  loginFailed,
  registerDone,
  registerFailed,
  register,
  logout,
  authenticate,
} = authSlice.actions;
