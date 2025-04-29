import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPassengers = createAsyncThunk(
    '/passengers.json',
    async () => {
        const response = await fetch('/passengers.json');
        const data = await response.json();
        return data;
    },
);
