import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IIngredientResponse} from "../types/ingredientResponse";
import {performGetRequest} from "../utils/request";
import {IIngredient} from "../types/ingredient";
import {TRootState} from "./store";
import {Status} from "../utils/constants";

interface IBurgerIngredientsState {
    items: Array<IIngredient>,
    selectedIngredient: IIngredient | null,
    status: Status
    error: string | null,
}

const initialState: IBurgerIngredientsState = {
    items: [],
    selectedIngredient: null,
    status: Status.INIT,
    error: null
}

export const fetchIngredients = createAsyncThunk<IIngredientResponse, void, { state: TRootState }>(
    'ingredients/fetch',
    async (_, thunkAPI) => {
        try {
            const {status, items} = thunkAPI.getState().burgerIngredients;
            // Если уже загружено — не делаем запрос
            if (status === 'success' && items.length > 0) {
                return thunkAPI.rejectWithValue('Ингредиенты уже были загружены ранее');
            }

            return (await performGetRequest('ingredients')) as IIngredientResponse;
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
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload.data;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = Status.FAIL;
                state.error = action.payload as string || 'Неизвестная ошибка';
                state.items = [];
            });
    },
});

export default burgerIngredientsSlice.reducer;