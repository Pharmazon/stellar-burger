import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IIngredientResponse} from "../../types/ingredientResponse";
import {performGetRequest} from "../../utils/request";
import {IIngredient} from "../../types/ingredient";
import {ApiStatus} from "../../utils/constants";

interface IBurgerIngredientsState {
    items: ReadonlyArray<IIngredient>,
    selectedIngredient: IIngredient | null,
    status: ApiStatus
    error: string | null,
}

const initialState: IBurgerIngredientsState = {
    items: [],
    selectedIngredient: null,
    status: ApiStatus.INIT,
    error: null
}

export const fetchIngredients = createAsyncThunk<IIngredientResponse, void,
    { state: { burgerIngredients: IBurgerIngredientsState } }>(
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
    name: 'burger/ingredients',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = ApiStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = ApiStatus.SUCCESS;
                state.items = action.payload.data;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = ApiStatus.FAIL;
                state.error = action.payload as string || 'Неизвестная ошибка';
                state.items = [];
            });
    },
});

export type BurgerIngredientsActions =
    | ReturnType<typeof fetchIngredients.pending>
    | ReturnType<typeof fetchIngredients.fulfilled>
    | ReturnType<typeof fetchIngredients.rejected>;

export default burgerIngredientsSlice.reducer;