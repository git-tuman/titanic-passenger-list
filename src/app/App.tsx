import React, { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchPassengers } from '../api/passengersApi';
import PassengerList from '../components/PassengerList';
import FormSearch from '../components/FormSearch';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPassengers());
    }, [dispatch]);

    return (
        <div className="app">
            <main className="container">
                <FormSearch />

                <PassengerList />
            </main>
        </div>
    );
}

export default App;
