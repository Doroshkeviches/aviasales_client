import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'src/repository';

// ======= utils, types ======= //
import { User } from '../../user/types/User.type';
import { Ticket } from '../types/Ticket.type';
import { Device } from '../types/Device.type';

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

export const getUserDevices = createAsyncThunk<Device[]>(
  'Get/userDevices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/devices`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
