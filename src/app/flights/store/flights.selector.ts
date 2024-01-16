import { RootState } from "src/store";

export const flightsSelector = (state: RootState) => state.flights.flights
export const flightsPendingSelector = (state: RootState) => state.flights.pending.flights
export const flightsErrorsSelector = (state: RootState) => state.flights.errors.flights
export const citiesSelector = (state: RootState) => state.flights.cities
export const citiesPendingSelector = (state: RootState) => state.flights.pending.cities
export const citiesErrorsSelector = (state: RootState) => state.flights.errors.cities

