import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./app/auth/store/auth.slice";
import { ticketsSlice } from "./app/tickets/store/tickets.slice";
import { usersSlice } from "./app/users/store/users.slice";
import { flightsSlice } from "./app/flights/store/flights.slice";
import { cartSlice } from "./app/cart/store/cart.slice";
export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    tickets: ticketsSlice.reducer,
    users: usersSlice.reducer,
    flights: flightsSlice.reducer,
    cart: cartSlice.reducer
})