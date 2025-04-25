import React, { FormEvent, useRef } from 'react';
import './App.scss';

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
            <button type="submit">SEARCH</button>
        </form>
    );
}

function ListItem() {
    return (
        <div className="list-item">
            <div className="info">
                <div>Lindblom, Miss. Augusta Charlotta</div>
                <div>ticket: 347073</div>
            </div>

            <div>F</div>

            <div>NOT SURVIVED</div>

            <div className="info">
                <div className="right-align">45y</div>
                <div>cabin: ?</div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app">
            <div className="container">
                <Form />

                <div className="list">
                    <ListItem />
                </div>
            </div>
        </div>
    );
}

export default App;
