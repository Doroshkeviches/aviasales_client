import { RootState } from "src/store";

export const cartTicketsSelector = (state: RootState) => state.cart.tickets
export const cartTicketsErrorsSelector = (state: RootState) => state.cart.errors.tickets
export const cartTicketsPendingSelector = (state: RootState) => state.cart.pending.tickets
