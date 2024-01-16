import { RootState } from "src/store";

export const sessionSelector = (state: RootState) => state.auth.session
export const sessionPendingSelector = (state: RootState) => state.auth.pending.session
export const sessionErrorsSelector = (state: RootState) => state.auth.errors.session


export const resetTokenSelector = (state: RootState) => state.auth.reset_token
export const resetTokenPendingSelector = (state: RootState) => state.auth.pending.reset_token
export const resetTokenErrorsSelector = (state: RootState) => state.auth.errors.reset_token

