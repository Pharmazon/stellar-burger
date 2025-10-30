import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Ingredient} from "../utils/ingredient";
import {request} from "../utils/request";

interface BurgerIngredientsState {
    items: Ingredient[],
    selectedIngredient: Ingredient | null,
    status: 'idle' | 'loading' | 'success' | 'fail'
    error: string | null,
}

const initialState: BurgerIngredientsState = {
    items: [],
    selectedIngredient: null,
    status: 'idle',
    error: null,
}

export const fetchIngredients = createAsyncThunk<Ingredient[], void, { rejectValue: string }>(
    'burgerIngredients/fetchIngredients',
    async (_, thunkAPI) => {
        try {
            return (await request('ingredients')).data;
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
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'fail';
                state.error = action.payload || 'Неизвестная ошибка';
                state.items = [];
            });
    },
});

export default burgerIngredientsSlice.reducer;