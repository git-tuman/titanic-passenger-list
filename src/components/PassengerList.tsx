import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';
import { RootState } from '../app/store';
import { Passenger } from '../app/store/passengersSlice';
import {
    AGE,
    GENDER,
    LOADING,
    NAME,
    SURVIVAL_STATUS,
    SURVIVED,
    UNFILTERED,
} from '../constants';

const getFilteredPassengers = (
    passengers: Passenger[],
    selectedOption: string,
    valueFilter: string,
) => {
    switch (selectedOption) {
        case NAME:
            return passengers.filter((item) => item.name.includes(valueFilter));
        case GENDER:
            return passengers.filter((item) => item.gender === valueFilter);
        case AGE:
            return passengers.filter((item) => item.age === +valueFilter);
        case SURVIVAL_STATUS: {
            const isSurvived = valueFilter === SURVIVED;
            return passengers.filter((item) => item.survived === isSurvived);
        }
        default:
            return passengers;
    }
};

const PassengerList = memo(
    ({
        visibleCount,
        refCallback,
    }: {
        visibleCount: number;
        refCallback: (node: Element | null) => void;
    }) => {
        const { passengers, loading, error } = useSelector(
            (state: RootState) => state.passengers,
        );
        const [list, setList] = useState<Passenger[]>([]);

        const { selectedOption, valueFilter } = useSelector(
            (state: RootState) => state.filter,
        );

        useEffect(() => {
            if (valueFilter !== null) {
                setList(
                    getFilteredPassengers(
                        passengers,
                        selectedOption,
                        valueFilter,
                    ),
                );
            } else if (selectedOption === UNFILTERED) {
                setList(passengers);
            }
        }, [valueFilter, passengers, selectedOption]);

        if (loading) return <span>{LOADING}</span>;

        if (error) return <span>{error}</span>;

        return (
            <ul className="list">
                {list.slice(0, visibleCount).map((item, index) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        reference={
                            index === visibleCount - 1 ? refCallback : null
                        }
                    />
                ))}
            </ul>
        );
    },
);

export default PassengerList;
