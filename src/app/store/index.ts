import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import passengersReducer from './passengersSlice';

const logger = createLogger({
    level: 'log',
    collapsed: true,
});

export const store = configureStore({
    reducer: {
        passengers: passengersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
