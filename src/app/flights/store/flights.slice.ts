import { createSlice } from '@reduxjs/toolkit';
import { getCities, getFlights } from './flghts.action';
import { Paths } from '../types/Paths.type';

interface AuthState {
  flights: Paths[];
  cities: string[];
  pending: {
    flights: boolean;
    cities: boolean;
  };
  errors: {
    flights: null | string;
    cities: null | string;
  };
}

const initialState: AuthState = {
  flights: [],
  cities: [],
  pending: {
    flights: false,
    cities: false,
  },
  errors: {
    flights: null,
    cities: null,
  },
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.pending.flights = true;
        state.errors.flights = null;
      })
      .addCase(getFlights.fulfilled, (state, { payload }) => {
        state.flights = payload;
        state.pending.flights = false;
      })
      .addCase(getFlights.rejected, (state, { payload }: any) => {
        state.flights = [];
        state.errors.flights = payload.response.data.message;
        state.pending.flights = false;
      })

      .addCase(getCities.pending, (state) => {
        state.pending.cities = true;
        state.errors.cities = null;
      })
      .addCase(getCities.fulfilled, (state, { payload }) => {
        state.cities = payload.map((city) => city.title);
        state.pending.cities = false;
      })
      .addCase(getCities.rejected, (state, { payload }: any) => {
        state.cities = [];
        state.errors = payload.response.data.message;
        state.pending.cities = false;
      });
  },
});
