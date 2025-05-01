import React, { memo } from 'react';
import { Passenger } from '../app/store/passengersSlice';
import { NOT_SURVIVED, SURVIVED } from '../constants';

const ListItem = memo(
    ({
        item,
        reference,
    }: {
        item: Passenger;
        reference: (node: Element | null) => void;
    }) => {
        if (!item.name || !item.ticket || !item.gender) return null;

        return (
            <li ref={reference} className="list-item">
                <section className="info">
                    <p className="name">{item.name}</p>
                    <p>{`ticket: ${item.ticket}`}</p>
                </section>

                <p className="uppercase">{item.gender[0] || '?'}</p>

                <p className="uppercase">
                    {item.survived ? SURVIVED : NOT_SURVIVED}
                </p>

                <section className="info">
                    <p className="right-align">{`${Math.round(item.age)}y`}</p>
                    <p className="right-align">
                        {`cabin: ${item.cabin || '?'}`}
                    </p>
                </section>
            </li>
        );
    },
);

export default ListItem;
