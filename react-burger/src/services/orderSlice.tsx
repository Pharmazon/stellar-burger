import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Ingredient from "../utils/ingredient";
import {CREATE_ORDER_URL} from "../utils/constants";

export interface Order {
    name: string;
    order: {
        number: number;
    };
}

interface OrderState {
    order: Order['order'] | null;
    status: 'idle' | 'loading' | 'success' | 'fail';
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    status: 'idle',
    error: null,
};

export const createOrderRequest = createAsyncThunk<Order, Ingredient[], { rejectValue: string }>(
    'order/createOrderRequest',
    async (itemsToOrder, thunkAPI) => {

        try {
            const response = await fetch(CREATE_ORDER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: itemsToOrder.map(item => item._id)}),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const responseJson = await response.json();

            if (!responseJson.success) {
                throw new Error("Сервер вернул ошибку: success = false");
            }

            return responseJson;
        } catch (error: any) {
            const message = error.message || 'Неизвестная ошибка при создании заказа';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderRequest.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createOrderRequest.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'success';
                state.order = action.payload.order;
            })
            .addCase(createOrderRequest.rejected, (state, action) => {
                state.error = `Ошибка создания заказа: ${action.payload}`;
                state.status = 'fail';
            });
    }
});

export default orderSlice.reducer;