import React, {
    ChangeEvent,
    FormEvent,
    memo,
    useEffect,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import { AppDispatch, RootState } from '../app/store';
import { setValueFilter } from '../app/store/filterSlice';
import {
    AGE,
    GENDER,
    HEADER_LIST,
    NAME,
    SEARCH,
    SURVIVAL_STATUS,
    UNFILTERED,
} from '../constants';

function Radio({
    valueInput,
    item,
    callback,
}: {
    valueInput: string;
    item: string;
    callback: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="radio">
            <input
                type="radio"
                name="radioOption"
                value={item}
                checked={item === valueInput}
                onChange={callback}
            />
            <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
        </div>
    );
}

const FormSearch = memo(() => {
    const [valueInput, setValueInput] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { arrayGender, arraySurvivalStatus, selectedOption } = useSelector(
        (state: RootState) => state.filter,
    );

    useEffect(() => {
        setValueInput(null);
    }, [selectedOption]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (valueInput) {
            dispatch(setValueFilter(valueInput));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <Filter />

            {selectedOption === UNFILTERED && (
                <p className="header-list">{HEADER_LIST}</p>
            )}

            {selectedOption === NAME && (
                <input
                    value={valueInput || ''}
                    type="text"
                    placeholder={selectedOption}
                    onChange={handleChange}
                />
            )}

            {selectedOption === GENDER && (
                <div className="radio-group">
                    {arrayGender.map((item) => (
                        <Radio
                            key={item}
                            valueInput={valueInput}
                            item={item}
                            callback={handleChange}
                        />
                    ))}
                </div>
            )}

            {selectedOption === AGE && (
                <input
                    min="1"
                    max="100"
                    value={valueInput || ''}
                    type="number"
                    placeholder={selectedOption}
                    onChange={handleChange}
                />
            )}

            {selectedOption === SURVIVAL_STATUS && (
                <div className="radio-group">
                    {arraySurvivalStatus.map((item) => (
                        <Radio
                            key={item}
                            valueInput={valueInput}
                            item={item}
                            callback={handleChange}
                        />
                    ))}
                </div>
            )}

            {selectedOption !== UNFILTERED && (
                <button type="submit">{SEARCH}</button>
            )}
        </form>
    );
});

export default FormSearch;
