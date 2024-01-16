import { createAsyncThunk } from '@reduxjs/toolkit';

// ======= helpers ======= //
import repository from 'src/repository';

// ======= types ======= //
import { City } from '../types/City.type';
import { Paths } from '../types/Paths.type';
import { GetFlights } from '../types/GetFlights.type';

export const getFlights = createAsyncThunk<Paths[], GetFlights>(
  'GET/flights',
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.get(
        `/flights?sortedBy=${body.sortedBy}&from_city=${body.from_city}&to_city=${body.to_city}&date=${body.start_flight_date}&isReturn=${body.isReturn}&returnDate=${body.return_flight_date}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getCities = createAsyncThunk<City[]>(
  'GET/Cities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('/city');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
