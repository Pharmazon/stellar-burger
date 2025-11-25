import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS
} from "../middleware/socket-middleware";

interface ISocketState {
    wsConnected: boolean;
    error: string | null;
    isLoading: boolean;
}

const initialState: ISocketState = {
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
            .addMatcher(
                (action) => action.type === WS_CONNECTION_START,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
            .addMatcher(
                (action) => action.type === WS_CONNECTION_SUCCESS,
                (state) => {
                    state.wsConnected = true;
                    state.isLoading = false;
                    state.error = null;
                })
            .addMatcher(
                (action) => action.type === WS_CONNECTION_ERROR,
                (state, action: PayloadAction<string>) => {
                    state.wsConnected = false;
                    state.isLoading = false;
                    state.error = action.payload;
                })
            .addMatcher(
                (action) => action.type === WS_CONNECTION_CLOSE,
                (state) => {
                    state.wsConnected = false;
                    state.isLoading = false;
                })
    }
});

export default socketSlice.reducer;