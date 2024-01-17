import { createSlice } from '@reduxjs/toolkit';
import { getUser } from './user.action';

// ======= types ======= //
import { User } from '../types/User.type';
import { Device } from '../types/Device.type';

interface UserState {
  user: User | null;
  devices: Device[];
  pending: {
    user: boolean;
    devices: boolean;
  };
  errors: {
    user: null | string;
    devices: null | string;
  };
}

const initialState: UserState = {
  user: null,
  devices: [],
  pending: {
    user: false,
    devices: false,
  },
  errors: {
    user: null,
    devices: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.pending.user = false;
      })
      .addCase(getUser.rejected, (state, { payload }: any) => {
        state.errors.user = payload.response.data.message;
        state.user = null;
        state.pending.user = false;
      });
  },
});
