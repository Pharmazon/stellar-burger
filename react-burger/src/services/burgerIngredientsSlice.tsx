import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Ingredient} from "../utils/ingredient";
import {GET_INGREDIENTS_URL} from "../utils/constants";

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
            const response = await fetch(GET_INGREDIENTS_URL);

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const responseJson = await response.json();

            if (!responseJson.success) {
                throw new Error("Сервер вернул ошибку: success = false");
            }

            return responseJson.data;
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