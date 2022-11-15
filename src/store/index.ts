import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// Reducers
import { userSlice, UserState } from './user';
import { authSlice, AuthState } from './auth';
import { appSlice, AppState } from './app';
import { mainRoomSlice, MainRoomState } from './main-room';
import { gameSlice, GameState } from './game';
import { rootSaga } from './sagas';

declare global {
  interface RootState {
    user: UserState;
    auth: AuthState;
    app: AppState;
    mainRoom: MainRoomState;
    game: GameState;
  }
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    app: appSlice.reducer,
    mainRoom: mainRoomSlice.reducer,
    game: gameSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
