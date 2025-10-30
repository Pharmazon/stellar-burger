import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import ingredientDetailsReducer from './ingredientDetailsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import burgerIngredientsReducer from './burgerIngredientsSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () =>
    useDispatch<typeof store.dispatch>();