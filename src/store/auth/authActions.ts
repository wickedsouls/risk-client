import { createAsyncAction, createAction } from 'typesafe-actions';
import { AccessToken, RegistrationPayload } from './types';
import { HttpResponseError } from '../../common/types';

export const login = createAsyncAction(
  'auth/LOGIN_STARTED',
  'auth/LOGIN_DONE',
  'auth/LOGIN_FAILED',
)<unknown, AccessToken, HttpResponseError>();

export const register = createAsyncAction(
  'auth/REGISTRATION_STARTED',
  'auth/REGISTRATION_DONE',
  'auth/REGISTRATION_FAILED',
)<RegistrationPayload, AccessToken, HttpResponseError>();

export const authenticate = createAction('app/AUTHENTICATE')();

export const logout = createAction('app/LOGOUT')();
