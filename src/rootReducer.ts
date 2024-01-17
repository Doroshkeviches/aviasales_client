import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './app/auth/store/auth.slice';
import { flightsSlice } from './app/flights/store/flights.slice';
import { userSlice } from './app/user/store/user.slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  flights: flightsSlice.reducer,
});
