import {createSlice} from "@reduxjs/toolkit";
import {onConnected, onDisconnected, onError} from "./actions";

interface ISocketState {
    wsConnected: boolean;
    error: string | null;
    isLoading: boolean;
}

export const initialState: ISocketState = {
    wsConnected: false,
    error: null,
    isLoading: true
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(onConnected, (state) => {
                state.wsConnected = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(onDisconnected, (state) => {
                state.wsConnected = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(onError, (state, action) => {
                state.wsConnected = false;
                state.isLoading = false;
                state.error = 'WebSocket error';
                console.error('WebSocket error:', action.payload);
            });
    },
});

export default socketSlice.reducer;