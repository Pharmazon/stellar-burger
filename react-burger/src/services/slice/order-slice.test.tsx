import orderReducer, {clearOrder, createOrder, getOrder, initialState, IOrderState, setOrderInfo} from './order-slice';
import {ApiStatus, FeedOrderStatus} from "../../utils/constants";
import {IFeedOrder} from "../../types/feedOrder";
import {IOrderResponse} from "../../types/orderResponse";
import {IFeedData} from "../../types/feedData";

const mockOrderInfo: IFeedOrder = {
    _id: 'sdfsdf',
    owner: 'test',
    number: 456,
    status: FeedOrderStatus.PENDING,
    createdAt: '2025-12-16T10:00:00Z',
    updatedAt: '2025-12-16T10:00:00Z',
    ingredients: ['ing3', 'ing4'],
    name: 'Test Order'
};

describe("order reducer tests", () => {

    it('initialized with valid state', () => {
        const actualState = orderReducer(undefined, {type: 'unknown'});

        expect(actualState).toEqual(initialState);
    });

    it('clearOrder', () => {
        const prevState: IOrderState = {
            order: {number: 123},
            status: ApiStatus.SUCCESS,
            error: 'Some error',
            orderInfo: mockOrderInfo
        };
        const action = clearOrder();

        const actualState = orderReducer(prevState, action);

        expect(actualState).toEqual(initialState);
    });

    it('setOrderInfo', () => {
        const action = setOrderInfo(mockOrderInfo);

        const actualState = orderReducer(initialState, action);

        expect(actualState.orderInfo).toEqual(mockOrderInfo);
        expect(actualState.status).toBe(ApiStatus.INIT);
        expect(actualState.error).toBeNull();
        expect(actualState.order).toBeNull();
    });

    it('createOrder.pending', () => {
        const action = createOrder.pending('', {ingredients: ['ing1']});

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.LOADING);
        expect(actualState.error).toBeNull();
        expect(actualState.order).toBeNull();
        expect(actualState.orderInfo).toBeNull();
    });

    it('createOrder.fulfilled', () => {
        const mockResponse: IOrderResponse = {
            success: true,
            message: undefined,
            name: 'name',
            order: {number: 789}
        };
        const action = createOrder.fulfilled(mockResponse, '', {ingredients: ['ing1']});

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.error).toBeNull();
        expect(actualState.order).toEqual(mockResponse.order);
        expect(actualState.orderInfo).toBeNull();
    });

    it('createOrder.rejected', () => {
        const errorMessage = 'Network Error';
        const action = createOrder.rejected(new Error(errorMessage), '', {ingredients: ['ing1']}, errorMessage);

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe('Ошибка создания заказа: Network Error');
        expect(actualState.order).toBeNull();
        expect(actualState.orderInfo).toBeNull();
    });

    it('getOrder.pending', () => {
        const action = getOrder.pending('', 123);

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.LOADING);
        expect(actualState.error).toBeNull();
        expect(actualState.order).toBeNull();
        expect(actualState.orderInfo).toBeNull();
    });

    it('getOrder.fulfilled', () => {
        const mockResponse: IFeedData = {
            success: true,
            orders: [mockOrderInfo]
        };
        const action = getOrder.fulfilled(mockResponse, '', 123);

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.error).toBeNull();
        expect(actualState.orderInfo).toEqual(mockOrderInfo);
        expect(actualState.order).toBeNull();
    });

    it('getOrder.rejected', () => {
        const mockError = {message: 'Ошибка получения заказа: Not Found'};
        const action = getOrder.rejected(new Error('test'), '', 123, mockError);

        const actualState = orderReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe(mockError.message);
        expect(actualState.orderInfo).toBeNull();
        expect(actualState.order).toBeNull();
    });
})