import publicFeedReducer, {initialState} from './public-feed-slice';
import {IFeedData} from '../../types/feedData';
import {onMessageReceived} from './actions';
import {FeedOrderStatus} from "../../utils/constants";

const mockFeedData: IFeedData = {
    success: true,
    message: undefined,
    total: 5,
    totalToday: 15,
    orders: [
        {
            _id: '60d4f8f2a6c2b4001f8e4567',
            owner: 'user123',
            number: 12345,
            status: FeedOrderStatus.DONE,
            createdAt: '2025-12-16T10:00:00Z',
            updatedAt: '2025-12-16T10:05:00Z',
            ingredients: ['ing1', 'ing2'],
            name: 'Burger'
        }
    ]
};

describe('public feed reducer tests', () => {

    it('initialized with valid state', () => {
        const actualState = publicFeedReducer(undefined, {type: 'unknown'});

        expect(actualState).toEqual(initialState);
    });

    it('onMessageReceived', () => {
        const action = onMessageReceived(mockFeedData);

        const actualState = publicFeedReducer(initialState, action);

        expect(actualState.data).toEqual(mockFeedData);
    });
});