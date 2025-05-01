import React, { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { AppDispatch } from './store';
import { fetchPassengers } from '../api/passengersApi';
import PassengerList from '../components/PassengerList';
import FormSearch from '../components/FormSearch';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPassengers());
    }, [dispatch]);

    const [visibleCount, setVisibleCount] = useState(20);
    const { ref, inView } = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            setVisibleCount((prev) => prev + 20);
        }
    }, [inView]);

    return (
        <div className="app">
            <main className="container">
                <FormSearch />

                <PassengerList visibleCount={visibleCount} refCallback={ref} />
            </main>
        </div>
    );
}

export default App;
