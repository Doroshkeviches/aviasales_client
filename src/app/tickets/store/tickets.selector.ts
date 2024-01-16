import { RootState } from "src/store";

export const ticketsSelector = (state: RootState) => state.tickets.tickets
export const ticketsErrorsSelector = (state: RootState) => state.tickets.errors.tickets
export const ticketsPendingSelector = (state: RootState) => state.tickets.pending.tickets
