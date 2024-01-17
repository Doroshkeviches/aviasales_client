import { createSlice } from '@reduxjs/toolkit';
import { getTickets } from './cart.actions';
import { Ticket } from '../types/Ticket.type';

interface CartState {
    tickets: Ticket[];
    pending: {
        tickets: boolean;
    };
    errors: {
        tickets: null | string;
    };
}

const initialState: CartState = {
    tickets: [],
    pending: {
        tickets: false
    },
    errors: {
        tickets: null
    },
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.pending.tickets = true;
                state.errors.tickets = null;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                state.tickets = payload
                state.pending.tickets = false;
            })
            .addCase(getTickets.rejected, (state, { payload }: any) => {
                state.errors.tickets = payload.response.data.message;
                state.pending.tickets = false;
            });
    }
});

