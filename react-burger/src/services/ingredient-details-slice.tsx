import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredient} from "../types/ingredient";

interface IIngredientDetailsState {
    ingredientDetails: IIngredient | null
}

const initialState: IIngredientDetailsState = {
    ingredientDetails: null
}

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<IIngredient>) => {
            state.ingredientDetails = action.payload;
        },
        deselect: (state) => {
            state.ingredientDetails = null;
        },
    },
});

export const {select, deselect} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;