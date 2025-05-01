import { createSlice } from '@reduxjs/toolkit';
import { fetchPassengers } from '../../api/passengersApi';
import { LOADING_ERROR } from '../../constants';

export interface Passenger {
    id: number;
    class: string;
    survived: boolean;
    name: string;
    gender: string;
    age: number;
    sibsp: string;
    parch: string;
    ticket: string;
    fare: string;
    cabin: string;
    embarked: string;
    boat: string | null;
    body: string | null;
    'home.dest': string;
}

interface State {
    passengers: Passenger[];
    loading: boolean;
    error: string | null;
}

const initialState: State = {
    passengers: [],
    loading: false,
    error: null,
};

const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPassengers.pending, (state) => ({
                ...state,
                loading: true,
                error: null,
            }))
            .addCase(fetchPassengers.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                passengers: action.payload,
            }))
            .addCase(fetchPassengers.rejected, (state, action) => ({
                ...state,
                loading: false,
                error: action.error.message || LOADING_ERROR,
            }));
    },
});

const passengersReducer = passengersSlice.reducer;

export default passengersReducer;
