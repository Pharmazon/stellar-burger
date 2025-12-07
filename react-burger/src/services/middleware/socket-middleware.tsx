import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware} from '@reduxjs/toolkit';

type WebSocketActions<TMessage> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage: ActionCreatorWithPayload<TMessage>;
    onConnected: ActionCreatorWithPayload<Event>;
    onDisconnected: ActionCreatorWithPayload<CloseEvent>;
    onMessageReceived: ActionCreatorWithPayload<TMessage>;
    onError: ActionCreatorWithPayload<Event>;
};

type WebSocketOptions = {
    withTokenRefresh: boolean;
};

export const createWebSocketMiddleware = <TMessage = unknown>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError,
    }: WebSocketActions<TMessage>,
    {withTokenRefresh}: WebSocketOptions
): Middleware => {
    return store => {

        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let wsUrl: string;

        return next => (action: unknown) => {
            const {dispatch} = store;

            if (connect.match(action)) {

                if (socket !== null) {
                    console.warn('WebSocket is already connected.');
                    return;
                }

                wsUrl = action.payload;
                socket = new WebSocket(wsUrl);
                isConnected = true;

                socket.onopen = event => {
                    dispatch(onConnected(event));
                };

                socket.onerror = event => {
                    dispatch(onError(event));
                    socket = null;
                };

                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    dispatch(onMessageReceived(data));

                    if (withTokenRefresh && data.message === 'Invalid or missing token') {
                        // refreshToken().then(refreshData => {
                        //     const wssUrl = new URL(wsUrl);
                        //     wssUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
                        //     dispatch(connect(wssUrl.toString()));
                        // }); //TODO SAS

                        dispatch(disconnect());
                    }
                };

                socket.onclose = event => {
                    dispatch(onDisconnected(event));
                    socket = null;

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(wsUrl));
                        }, 3000);
                    }
                };

                return next(action);
            }

            if (disconnect.match(action)) {
                if (socket !== null) {
                    socket.close();
                }

                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket = null;
            }

            if (sendMessage.match(action)) {
                if (socket !== null && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(action.payload));
                } else {
                    console.warn('WebSocket is not open. Cannot send message.');
                }
            }

            return next(action);
        };
    };
};