import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {performGetRequest, performPostRequest} from "../../utils/request";
import {IOrder, IOrderResponse} from "../../types/orderResponse";
import {IOrderRequest} from "../../types/orderRequest";
import {ApiStatus} from "../../utils/constants";
import {IFeedOrder} from "../../types/feedOrder";
import {IFeedData} from "../../types/feedData";

export interface IOrderState {
    order: IOrder | null;
    status: ApiStatus;
    error: string | null;
    orderInfo: IFeedOrder | null;
}

export const initialState: IOrderState = {
    order: null,
    status: ApiStatus.INIT,
    error: null,
    orderInfo: null
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

export const getOrder = createAsyncThunk<IFeedData, number>(
    'order/get',
    async (orderNumber, thunkAPI) => {
        try {
            return await performGetRequest(`orders/${orderNumber}`) as IFeedData
        } catch (error: any) {
            const message = error.message || 'Неизвестная ошибка при получении заказа';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        clearOrder: () => {
            return initialState;
        },
        setOrderInfo: (state: IOrderState, action) => {
            state.orderInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.error = null;
                state.status = ApiStatus.LOADING;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.error = null;
                state.status = ApiStatus.SUCCESS;
                state.order = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = `Ошибка создания заказа: ${action.payload}`;
                state.status = ApiStatus.FAIL;
            })
            .addCase(getOrder.pending, (state) => {
                state.error = null;
                state.status = ApiStatus.LOADING;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.error = null;
                state.status = ApiStatus.SUCCESS;
                state.orderInfo = action.payload.orders[0];
            })
            .addCase(getOrder.rejected, (state, action: any) => {
                state.error = action.payload.message;
                state.status = ApiStatus.FAIL;
            });
    }
});

export default orderSlice.reducer;
export const {clearOrder, setOrderInfo} = orderSlice.actions;
export type OrderActions =
    | ReturnType<typeof clearOrder>
    | ReturnType<typeof setOrderInfo>
    | ReturnType<typeof createOrder.pending>
    | ReturnType<typeof createOrder.fulfilled>
    | ReturnType<typeof createOrder.rejected>
    | ReturnType<typeof getOrder.pending>
    | ReturnType<typeof getOrder.fulfilled>
    | ReturnType<typeof getOrder.rejected>;