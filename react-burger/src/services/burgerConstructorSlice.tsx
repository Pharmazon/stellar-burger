import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ingredient from "../utils/ingredient";

interface BurgerConstructorState {
    ingredients: Ingredient[],
    selectedBun: Ingredient | null;
}

const initialState: BurgerConstructorState = {
    ingredients: [],
    selectedBun: null
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(
                (element) => element._id !== action.payload
            );
        }
    }
});

export const {
    addIngredient,
    removeIngredient
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;