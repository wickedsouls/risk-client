import { createAsyncAction, createAction } from 'typesafe-actions';
import { UserPayload } from './types';
import { HttpResponseError } from '../../common/types';

export const getUser = createAsyncAction(
  'user/GET_USER_STARTED',
  'user/GET_USER_DONE',
  'user/GET_USER_FAILED',
)<{ id: string }, UserPayload, HttpResponseError>();

export const clearUserData = createAction('user/CLEAR_USER_DATA')();
