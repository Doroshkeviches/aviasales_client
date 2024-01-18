import { createAsyncThunk } from '@reduxjs/toolkit';
 
// ======= utils, types ======= //
import repository from 'src/repository';
import { User } from '../../user/types/User.type';
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
