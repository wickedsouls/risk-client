import { produce } from 'immer';
import { getType, ActionType } from 'typesafe-actions';
import * as actions from './authActions';
import { HttpResponseError } from '../../common/types';

type Action = ActionType<typeof actions>;

export interface AuthState {
  isAuthenticated?: boolean;
  isGuest?: boolean;
  loginInProgress?: boolean;
  registrationInProgress?: boolean;
  loginError?: HttpResponseError;
  registrationError?: HttpResponseError;
}

const INITIAL_STATE: AuthState = {};

export const authReducer = produce((state, action: Action) => {
  switch (action.type) {
    case getType(actions.login.request):
      state.loginInProgress = true;
      break;
    case getType(actions.login.failure):
      state.loginError = action.payload;
      state.loginInProgress = false;
      break;
    case getType(actions.login.success):
      state.loginInProgress = false;
      state.isAuthenticated = true;
      state.loginError = undefined;
      break;
    case getType(actions.register.request):
      state.registrationInProgress = true;
      break;
    case getType(actions.register.failure):
      state.registrationError = action.payload;
      state.registrationInProgress = false;
      break;
    case getType(actions.register.success):
      state.registrationInProgress = false;
      state.registrationError = undefined;
      state.isAuthenticated = true;
      break;
    case getType(actions.authenticate):
      state.isAuthenticated = true;
      break;
    case getType(actions.logout):
      state.isAuthenticated = false;
      break;
    default:
      return state;
  }
}, INITIAL_STATE);
