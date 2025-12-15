import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBurgerConstructorIngredient, IIngredient} from "../../types/ingredient";

interface IBurgerConstructorState {
    ingredients: Array<IBurgerConstructorIngredient>,
    selectedBun: IIngredient | null;
}

export const initialState: IBurgerConstructorState = {
    ingredients: [],
    selectedBun: null
}

interface IMoveIngredientAction {
    from: number;
    to: number;
}

const burgerConstructorSlice = createSlice({
    name: 'burger/constructor',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.ingredients = [];
            state.selectedBun = null;
        },
        moveIngredient: (state, action: PayloadAction<IMoveIngredientAction>) => {
            const {from, to} = action.payload;
            const [movedItem] = state.ingredients.splice(from, 1);
            state.ingredients.splice(to, 0, movedItem);
        },
        addBun: (state, action: PayloadAction<IIngredient>) => {
            state.selectedBun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<IBurgerConstructorIngredient>) => {
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

export type BurgerConstructorActions =
    | ReturnType<typeof addIngredient>
    | ReturnType<typeof removeIngredient>
    | ReturnType<typeof addBun>
    | ReturnType<typeof moveIngredient>
    | ReturnType<typeof clear>

export default burgerConstructorSlice.reducer;