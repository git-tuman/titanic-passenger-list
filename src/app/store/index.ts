import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import passengersReducer from './passengersSlice';
import filterReducer from './filterSlice';

const logger = createLogger({
    level: 'log',
    collapsed: true,
});

export const store = configureStore({
    reducer: {
        passengers: passengersReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
