import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IngredientResponse} from "../types/ingredientResponse";
import {performGetRequest} from "../utils/request";
import {Ingredient} from "../types/ingredient";
import {RootState} from "./store";

interface BurgerIngredientsState {
    items: Ingredient[],
    selectedIngredient: Ingredient | null,
    status: 'init' | 'loading' | 'success' | 'fail'
    error: string | null,
}

const initialState: BurgerIngredientsState = {
    items: [],
    selectedIngredient: null,
    status: 'init',
    error: null
}

export const fetchIngredients = createAsyncThunk<IngredientResponse, void, { state: RootState }>(
    'ingredients/fetch',
    async (_, thunkAPI) => {
        try {
            const {status, items} = thunkAPI.getState().burgerIngredients;
            // Если уже загружено — не делаем запрос
            if (status === 'success' && items.length > 0) {
                return thunkAPI.rejectWithValue('Ингредиенты уже были загружены ранее');
            }
            
            return (await performGetRequest('ingredients')) as IngredientResponse;
        } catch (error: any) {
            const message = error.message || 'Неизвестная ошибка при загрузке ингредиентов';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload.data;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'fail';
                state.error = action.payload as string || 'Неизвестная ошибка';
                state.items = [];
            });
    },
});

export default burgerIngredientsSlice.reducer;