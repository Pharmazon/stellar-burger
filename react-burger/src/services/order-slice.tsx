import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {performPostRequest} from "../utils/request";
import {IOrder, IOrderResponse} from "../types/orderResponse";
import {IOrderRequest} from "../types/orderRequest";
import {Status} from "../utils/constants";

interface IOrderState {
    order: IOrder | null;
    status: Status;
    error: string | null;
}

const initialState: IOrderState = {
    order: null,
    status: Status.INIT,
    error: null,
};

export const createOrder = createAsyncThunk<IOrderResponse, IOrderRequest>(
    'order/create',
    async (itemsToOrder, thunkAPI) => {
        try {
            return await performPostRequest('orders', itemsToOrder) as IOrderResponse;
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
                state.status = Status.LOADING;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.error = null;
                state.status = Status.SUCCESS;
                state.order = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = `Ошибка создания заказа: ${action.payload}`;
                state.status = Status.FAIL;
            });
    }
});

export default orderSlice.reducer;