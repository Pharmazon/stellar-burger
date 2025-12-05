import {BurgerConstructorActions} from "./burger-constructor-slice";
import {BurgerIngredientsActions} from "./burger-ingredients-slice";
import {IngredientDetailsActions} from "./ingredient-details-slice";
import {OrderActions} from "./order-slice";
import {UserActions} from "./user-slice";
import {Action, createAction, UnknownAction} from "@reduxjs/toolkit";
import {IFeedData} from "../../types/feedData";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';

export interface WSConnectionStartAction {
    type: typeof WS_CONNECTION_START;
    payload: { path: string; isPrivate: boolean };
}

interface WSConnectionCloseAction {
    type: typeof WS_CONNECTION_CLOSE;
}

interface WSConnectionSuccessAction {
    type: typeof WS_CONNECTION_SUCCESS;
}

interface WSConnectionErrorAction {
    type: typeof WS_CONNECTION_ERROR;
    payload: string;
}

export type WebSocketActions =
    | WSConnectionStartAction
    | WSConnectionCloseAction
    | WSConnectionSuccessAction
    | WSConnectionErrorAction;

export type RootAction =
    | BurgerConstructorActions
    | BurgerIngredientsActions
    | IngredientDetailsActions
    | OrderActions
    | WebSocketActions
    | UserActions
    | Action
    | UnknownAction;

export const connect = createAction<string>('orders-feed/websocket/connect');
export const disconnect = createAction('orders-feed/websocket/disconnect');
export const sendMessage = createAction<IFeedData>('orders-feed/websocket/send-message');
export const onConnected = createAction<Event>('orders-feed/websocket/on-connected');
export const onDisconnected = createAction<CloseEvent>('orders-feed/websocket/on-disconnected');
export const onMessageReceived = createAction<IFeedData>('orders-feed/websocket/on-message-received');
export const onError = createAction<Event>('orders-feed/websocket/on-error');