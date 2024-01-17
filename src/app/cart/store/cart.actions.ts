import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ticket } from "../types/Ticket.type";
import repository from "src/repository";

export const getTickets = createAsyncThunk<Ticket[]>(
    'GET/usersTickets',
    async (_, { rejectWithValue }) => {
        try {
            const response = await repository.get('/ticket/cart');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);