import {Middleware} from '@reduxjs/toolkit';
import {BASE_WSS_URL} from "../../utils/constants";
import tokens from "../../utils/token";
import {IFeedData} from "../../types/feedData";
import {setPrivateFeedData} from "../slice/private-feed-slice";
import {setPublicFeedData} from "../slice/public-feed-slice";

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

interface WebSocketMiddleware extends Middleware {
    (store: any): (next: any) => (action: any) => any;
}

const socketMiddleware = (): WebSocketMiddleware => {
    return store => {

        let socket: WebSocket | null = null;
        let isConnecting = false;

        return next => (action: unknown) => {
            const {dispatch} = store;
            const actionType = typeof action === 'object' && action !== null &&
            'type' in action
                ? (action as { type: string }).type
                : 'unknown';

            if (actionType === WS_CONNECTION_START) {

                if (isConnecting || socket) {
                    // Уже есть активное подключение или идёт подключение — не создавать новое
                    return next(action);
                }

                const payload = (action as WSConnectionStartAction).payload;
                const {path, isPrivate} = payload;

                let wsUrl = `${BASE_WSS_URL}${path}`;
                if (isPrivate) {
                    const token = tokens.getCleanAccessToken();
                    if (!token) {
                        dispatch({
                            type: WS_CONNECTION_ERROR,
                            payload: 'Access токен не найден в cookie',
                        });
                        return next(action);
                    }
                    wsUrl += `?token=${token}`;
                }

                isConnecting = true;
                socket = new WebSocket(wsUrl);

                socket.onopen = () => {
                    isConnecting = false;
                    dispatch({type: WS_CONNECTION_SUCCESS});
                };

                socket.onerror = () => {
                    isConnecting = false;
                    dispatch({
                        type: WS_CONNECTION_ERROR,
                        payload: 'Ошибка подключения WebSocket',
                    });
                    socket = null;
                };

                socket.onmessage = event => {
                    try {
                        const data: IFeedData = JSON.parse(event.data);
                        if (isPrivate) {
                            dispatch(setPrivateFeedData(data));
                        } else {
                            dispatch(setPublicFeedData(data));
                        }
                    } catch (e) {
                        console.error('Ошибка парсинга WebSocket-сообщения:', e);
                        dispatch({type: WS_CONNECTION_ERROR, payload: 'Не удалось обработать сообщение'});
                    }
                }

                socket.onclose = () => {
                    isConnecting = false;
                    dispatch({type: WS_CONNECTION_CLOSE});
                    socket = null;
                };

                return next(action);
            }

            if (actionType === WS_CONNECTION_CLOSE) {
                if (socket !== null) {
                    socket.close();
                    socket = null;
                    isConnecting = false;
                }
                return next(action);
            }

            return next(action);
        };
    };
};

export default socketMiddleware;