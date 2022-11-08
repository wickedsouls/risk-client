import { produce } from 'immer';
import { getType, ActionType } from 'typesafe-actions';
import * as actions from './userActions';
import { HttpResponseError } from '../../common/types';
type Action = ActionType<typeof actions>;

export interface UserState {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  id?: string;
  isLoading?: boolean;
  error?: HttpResponseError;
}

const INITIAL_STATE: UserState = {};

export const userReducer = produce((state, action: Action) => {
  switch (action.type) {
    case getType(actions.clearUserData):
      state = {};
      break;
    case getType(actions.getUser.request):
      state.isLoading = true;
      break;
    case getType(actions.getUser.failure):
      state.isLoading = false;
      state.error = action.payload;
      break;
    case getType(actions.getUser.success): {
      const { username, id, firstName, lastName, email } = action.payload;
      state.username = username;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      break;
    }
    default:
      return state;
  }
}, INITIAL_STATE);
