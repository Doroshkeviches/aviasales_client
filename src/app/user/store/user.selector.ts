import { RootState } from 'src/store';

export const userSelector = (state: RootState) => state.user.user;
export const userErrorsSelector = (state: RootState) => state.user.errors.user;
export const userPendingSelector = (state: RootState) => state.user.pending.user;
