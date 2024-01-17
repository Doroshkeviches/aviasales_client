import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { forgotPassword, resetPassword, signin, signup } from './auth.actions';
import { DecodedUser } from '../types/DecodedUser.type';

interface AuthState {
  session: DecodedUser | null;
  reset_token: string | null;
  pending: {
    session: boolean;
    reset_token: boolean;
  };
  errors: {
    session: null | string;
    reset_token: string | null;
  };
}

function decode_user_from_token(token: string | null) {
  if (!token) return null;
  const decoded = jwtDecode(token) as DecodedUser;
  return decoded;
}

const initialState: AuthState = {
  session: decode_user_from_token(sessionStorage.getItem('access-token')),
  reset_token: null,
  pending: {
    session: false,
    reset_token: false,
  },
  errors: {
    session: null,
    reset_token: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, { payload }) => {
      state.session = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.pending.session = true;
        state.errors.session = null;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.session = decode_user_from_token(payload.access_token);
        state.pending.session = false;
      })
      .addCase(signin.rejected, (state, { payload }: any) => {
        state.errors.session = payload.response.data.message;
        state.pending.session = false;
      })


      .addCase(signup.pending, (state) => {
        state.pending.session = true;
        state.errors.session = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.session = decode_user_from_token(payload.access_token);
        state.pending.session = false;
      })
      .addCase(signup.rejected, (state, { payload }: any) => {
        state.errors.session = payload.response.data.message;
        state.pending.session = false;
      })


      .addCase(forgotPassword.pending, (state) => {
        state.pending.reset_token = true;
        state.errors.reset_token = null;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.reset_token = payload.token;
        state.pending.reset_token = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload }: any) => {
        state.errors.reset_token = payload.response.data.message;
        state.pending.reset_token = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.pending.session = true;
        state.errors.session = null;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.session = decode_user_from_token(payload.access_token);
        state.pending.session = false;
      })
      .addCase(resetPassword.rejected, (state, { payload }: any) => {
        state.errors.session = payload.response.data.message;
        state.pending.session = false;
      });
  },
});

export const { setSession } = authSlice.actions;
