import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ARR_GENDER, ARR_OPTION, ARR_SURVIVAL_STATUS } from '../../constants';

interface State {
    arrayOptions: string[];
    arrayGender: string[];
    arraySurvivalStatus: string[];
    selectedOption: string;
    valueFilter: string | null;
}

const initialState: State = {
    arrayOptions: ARR_OPTION,
    arrayGender: ARR_GENDER,
    arraySurvivalStatus: ARR_SURVIVAL_STATUS,
    selectedOption: ARR_OPTION[0],
    valueFilter: null,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedOption(state, action: PayloadAction<string>) {
            return {
                ...state,
                selectedOption: action.payload,
                valueFilter: null,
            };
        },
        setValueFilter(state, action: PayloadAction<string>) {
            return {
                ...state,
                valueFilter: action.payload,
            };
        },
    },
});

export const { setSelectedOption, setValueFilter } = filterSlice.actions;
const filterReducer = filterSlice.reducer;

export default filterReducer;
