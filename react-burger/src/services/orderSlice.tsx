import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BurgerConstructorIngredient} from "../utils/ingredient";
import {request} from "../utils/request";

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

export const createOrderRequest = createAsyncThunk<Order, BurgerConstructorIngredient[], { rejectValue: string }>(
    'order/createOrderRequest',
    async (itemsToOrder, thunkAPI) => {
        try {
            return await request('orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: itemsToOrder.map(item => item.item._id)})
            });
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