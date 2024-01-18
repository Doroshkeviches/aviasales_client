import { createAsyncThunk } from '@reduxjs/toolkit';
 
// ======= utils, types ======= //
import repository from 'src/repository';
import { User } from '../types/User.type';

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
