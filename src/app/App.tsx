import React, { FormEvent, useEffect, useRef } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { fetchPassengers } from '../api/passengersApi';
import { Passenger } from './store/passengersSlice';

const SEARCH = 'SEARCH';
const SURVIVED = 'SURVIVED';
const NOT_SURVIVED = 'NOT SURVIVED';
const LOADING = 'LOADING';

type PassengerPreview = Pick<
    Passenger,
    'name' | 'ticket' | 'gender' | 'survived' | 'age' | 'cabin'
>;

function Form() {
    const inputRef = useRef<HTMLInputElement>(null);

    const log = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current.value) {
            console.log(inputRef.current.value);
        }
    };

    return (
        <form onSubmit={log}>
            <input ref={inputRef} type="text" placeholder="Name" />
            <button type="submit">{SEARCH}</button>
        </form>
    );
}

function ListItem({
    name,
    ticket,
    gender,
    survived,
    age,
    cabin,
}: PassengerPreview) {
    if (!name || !ticket || !gender) return null;

    return (
        <div className="list-item">
            <div className="info">
                <div className="name">{name}</div>
                <div>{`ticket: ${ticket}`}</div>
            </div>

            <div>{gender[0]?.toUpperCase() || '?'}</div>

            <div>{survived ? SURVIVED : NOT_SURVIVED}</div>

            <div className="info">
                <div className="right-align">{`${Math.round(age)}y`}</div>
                <div className="right-align">{`cabin: ${cabin || '?'}`}</div>
            </div>
        </div>
    );
}

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { passengers, loading, error } = useSelector(
        (state: RootState) => state.passengers,
    );

    useEffect(() => {
        dispatch(fetchPassengers());
    }, [dispatch]);

    if (loading) return <div className="app">{LOADING}</div>;

    if (error) return <div className="app">{error}</div>;

    return (
        <div className="app">
            <div className="container">
                <Form />

                <div className="list">
                    {passengers.map((item: Passenger) => (
                        <ListItem
                            key={item.id}
                            name={item.name}
                            ticket={item.ticket}
                            gender={item.gender}
                            survived={item.survived}
                            age={item.age}
                            cabin={item.cabin}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
