import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import ingredientDetailsReducer from './slice/ingredient-details-slice';
import burgerConstructorReducer from './slice/burger-constructor-slice';
import userReducer from './slice/user-slice';
import orderReducer from './slice/order-slice';
import publicFeedReducer from './slice/public-feed-slice';
import socketReducer from './slice/socket-slice';
import privateFeedReducer from './slice/private-feed-slice';
import burgerIngredientsReducer from './slice/burger-ingredients-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createWebSocketMiddleware} from "./middleware/socket-middleware";
import {
    connect,
    disconnect,
    onConnected,
    onDisconnected,
    onError,
    onMessageReceived,
    RootAction,
    sendMessage
} from "./slice/actions";
import {IFeedData} from "../types/feedData";

const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    publicFeed: publicFeedReducer,
    privateFeed: privateFeedReducer,
    socket: socketReducer
});

export const ordersFeedWebSocketMiddleware = createWebSocketMiddleware<IFeedData>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError
    },
    {
        withTokenRefresh: true
    }
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(logger)
            .concat(ordersFeedWebSocketMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;