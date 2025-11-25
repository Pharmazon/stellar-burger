import {Action, configureStore, ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import ingredientDetailsReducer, {IngredientDetailsActions} from './slice/ingredient-details-slice';
import burgerConstructorReducer, {BurgerConstructorActions} from './slice/burger-constructor-slice';
import userReducer, {UserActions} from './slice/user-slice';
import orderReducer, {OrderActions} from './slice/order-slice';
import publicFeedReducer, {PublicFeedActions} from './slice/public-feed-slice';
import socketReducer from './slice/socket-slice';
import privateFeedReducer, {PrivateFeedActions} from './slice/private-feed-slice';
import burgerIngredientsReducer, {BurgerIngredientsActions} from './slice/burger-ingredients-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import socketMiddleware, {WebSocketActions} from "./middleware/socket-middleware";

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        user: userReducer,
        publicFeed: publicFeedReducer,
        privateFeed: privateFeedReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(logger)
            .concat(socketMiddleware()),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootAction =
    | BurgerConstructorActions
    | BurgerIngredientsActions
    | IngredientDetailsActions
    | OrderActions
    | WebSocketActions
    | PrivateFeedActions
    | PublicFeedActions
    | UserActions
    | Action
    | UnknownAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;