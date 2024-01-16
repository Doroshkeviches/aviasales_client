import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./app/auth/store/auth.slice";
import { ticketsSlice } from "./app/tickets/store/tickets.slice";
import { usersSlice } from "./app/users/store/users.slice";
import { flightsSlice } from "./app/flights/store/flights.slice";
export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    tickets: ticketsSlice.reducer,
    users: usersSlice.reducer,
    flights: flightsSlice.reducer

})