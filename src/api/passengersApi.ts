import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPassengers = createAsyncThunk(
    'fetch/passengers',
    async () => {
        const response = await fetch('./passengers.json');
        const data = await response.json();
        return data;
    },
);
