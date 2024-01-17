import { RootState } from 'src/store';

export const userSelector = (state: RootState) => state.user.user;
export const userErrorsSelector = (state: RootState) => state.user.errors.user;
export const userPendingSelector = (state: RootState) =>
  state.user.pending.user;

export const userTicketsSelector = (state: RootState) => state.user.tickets;
export const userTicketsErrorsSelector = (state: RootState) =>
  state.user.errors.tickets;
export const userTicketsPendingSelector = (state: RootState) =>
  state.user.pending.tickets;
