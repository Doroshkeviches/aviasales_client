import { createAsyncThunk } from '@reduxjs/toolkit';
 
// ======= utils, types ======= //
import repository from 'src/repository';
import { User } from '../types/User.type';
import UpdateUser from '../types/UpdateUser.type';

export const getUsers = createAsyncThunk<User[], number>(
  'Get/users',
  async (page, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user?page=${page}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUsersBySearch = createAsyncThunk<User[], string>(
  'Get/search_users',
  async (searchString, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user/search?q=${searchString}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

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

export const updateUser = createAsyncThunk<User, UpdateUser>(
  'Post/updateUser',
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.post(`/user`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
