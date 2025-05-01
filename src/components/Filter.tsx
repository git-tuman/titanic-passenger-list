import React, { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setSelectedOption } from '../app/store/filterSlice';

const Filter = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { arrayOptions, selectedOption } = useSelector(
        (state: RootState) => state.filter,
    );

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedOption(e.target.value));
    };

    return (
        <select
            className="filter"
            value={selectedOption}
            onChange={handleChange}
        >
            {arrayOptions.map((item) => (
                <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
            ))}
        </select>
    );
});

export default Filter;
