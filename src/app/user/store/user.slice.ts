import { createSlice } from '@reduxjs/toolkit';
import { getUser, getUserDevices } from './user.action';

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
      })

      .addCase(getUserDevices.pending, (state) => {
        state.pending.devices = true;
        state.errors.devices = null;
      })
      .addCase(getUserDevices.fulfilled, (state, { payload }) => {
        state.devices = payload;
        state.pending.devices = false;
      })
      .addCase(getUserDevices.rejected, (state, { payload }: any) => {
        state.errors.devices = payload.response.data.message;
        state.devices = [];
        state.pending.devices = false;
      })
  },
});
