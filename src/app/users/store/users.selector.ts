import { RootState } from 'src/store';

export const usersSelector = (state: RootState) => state.users.users;
export const usersErrorsSelector = (state: RootState) =>
  state.users.errors.users;
export const usersPendingSelector = (state: RootState) =>
  state.users.pending.users;

export const userSelector = (state: RootState) => state.users.user;
export const userErrorsSelector = (state: RootState) => state.users.errors.user;
export const userPendingSelector = (state: RootState) =>
  state.users.pending.user;

export const devicesSelector = (state: RootState) => state.users.devices;
export const devicesErrorsSelector = (state: RootState) =>
  state.users.errors.devices;
export const devicesPendingSelector = (state: RootState) =>
  state.users.pending.devices;
