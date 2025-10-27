import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../utils/ingredient";

interface IngredientDetailsState {
    ingredientDetails: Ingredient | null
}

const initialState: IngredientDetailsState = {
    ingredientDetails: null
}

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<Ingredient>) => {
            state.ingredientDetails = action.payload;
        },
        deselect: (state) => {
            state.ingredientDetails = null;
        },
    },
});

export const {select, deselect} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;