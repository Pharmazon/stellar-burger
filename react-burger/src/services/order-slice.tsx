import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {performPostRequest} from "../utils/request";
import {Order, OrderResponse} from "../types/orderResponse";
import {OrderRequest} from "../types/orderRequest";

interface OrderState {
    order: Order | null;
    status: 'init' | 'loading' | 'success' | 'fail';
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    status: 'init',
    error: null,
};

export const createOrder = createAsyncThunk<OrderResponse, OrderRequest>(
    'order/create',
    async (itemsToOrder, thunkAPI) => {
        try {
            return await performPostRequest('orders', itemsToOrder) as OrderResponse;
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
            .addCase(createOrder.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'success';
                state.order = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = `Ошибка создания заказа: ${action.payload}`;
                state.status = 'fail';
            });
    }
});

export default orderSlice.reducer;