import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BurgerConstructorIngredient, Ingredient} from "../types/ingredient";

interface BurgerConstructorState {
    ingredients: BurgerConstructorIngredient[],
    selectedBun: Ingredient | null;
}

const initialState: BurgerConstructorState = {
    ingredients: [],
    selectedBun: null
}

interface MoveIngredientAction {
    from: number;
    to: number;
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.ingredients = [];
            state.selectedBun = null;
        },
        moveIngredient: (state, action: PayloadAction<MoveIngredientAction>) => {
            const {from, to} = action.payload;
            const [movedItem] = state.ingredients.splice(from, 1);
            state.ingredients.splice(to, 0, movedItem);
        },
        addBun: (state, action: PayloadAction<Ingredient>) => {
            state.selectedBun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<BurgerConstructorIngredient>) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            state.ingredients = state.ingredients.filter(
                (element) => element.num !== action.payload
            );
        }
    }
});

export const {
    addIngredient,
    removeIngredient,
    addBun,
    moveIngredient,
    clear
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;