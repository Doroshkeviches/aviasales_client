import { createAsyncThunk } from '@reduxjs/toolkit';

// ======= utils, types ======= //
import repository from 'src/repository';
import { User } from '../../user/types/User.type';
import { Ticket } from '../types/Ticket.type';

export const getUser = createAsyncThunk<User, string>(
  'Get/user',
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user/current/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getActiveTicketsByUserId = createAsyncThunk<Ticket[], string>(
  'Get/activeTicketsByUserId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/ticket/tickets/:${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
