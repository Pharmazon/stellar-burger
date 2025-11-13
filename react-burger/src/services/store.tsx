import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import ingredientDetailsReducer from './ingredient-details-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import userReducer from './user-slice';
import orderReducer from './order-slice';
import burgerIngredientsReducer from './burger-ingredients-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export type TRootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () =>
    useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;