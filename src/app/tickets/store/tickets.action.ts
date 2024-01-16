import { createAsyncThunk } from '@reduxjs/toolkit';

// ======= utils, types ======= //
import repository from 'src/repository';
import { Ticket } from '../types/Ticket.type';

export const getTickets = createAsyncThunk<Ticket[]>(
  'Get/tickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('/ticket');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
