import {connect, disconnect, onConnected, onDisconnected, onError, onMessageReceived, sendMessage,} from './actions';
import {IFeedData} from '../../types/feedData';
import {FeedOrderStatus} from "../../utils/constants";

const mockFeedData: IFeedData = {
    success: true,
    orders: [
        {
            _id: 'order1',
            owner: 'user123',
            number: 12345,
            status: FeedOrderStatus.DONE,
            createdAt: '2025-12-16T10:00:00Z',
            updatedAt: '2025-12-16T10:05:00Z',
            ingredients: ['ing1', 'ing2'],
            name: 'Бургер',
        }
    ],
    total: 5,
    totalToday: 56
};

describe('WebSocket action creators', () => {

    it('connect', () => {
        const action = connect('/orders');

        expect(action.type).toBe('orders-feed/websocket/connect');
        expect(action.payload).toBe('/orders');
    });

    it('disconnect', () => {
        const action = disconnect();

        expect(action.type).toBe('orders-feed/websocket/disconnect');
        expect(action.payload).toBeUndefined();
    });

    it('sendMessage', () => {
        const action = sendMessage(mockFeedData);

        expect(action.type).toBe('orders-feed/websocket/send-message');
        expect(action.payload).toEqual(mockFeedData);
    });

    it('onConnected', () => {
        const mockEvent = new Event('open');
        const action = onConnected(mockEvent);

        expect(action.type).toBe('orders-feed/websocket/on-connected');
        expect(action.payload).toBe(mockEvent);
    });

    it('onDisconnected', () => {
        const mockCloseEvent = new CloseEvent('close');
        const action = onDisconnected(mockCloseEvent);

        expect(action.type).toBe('orders-feed/websocket/on-disconnected');
        expect(action.payload).toBe(mockCloseEvent);
    });

    it('onMessageReceived', () => {
        const action = onMessageReceived(mockFeedData);

        expect(action.type).toBe('orders-feed/websocket/on-message-received');
        expect(action.payload).toEqual(mockFeedData);
    });

    it('onError', () => {
        const mockErrorEvent = new Event('error');
        const action = onError(mockErrorEvent);

        expect(action.type).toBe('orders-feed/websocket/on-error');
        expect(action.payload).toBe(mockErrorEvent);
    });
});