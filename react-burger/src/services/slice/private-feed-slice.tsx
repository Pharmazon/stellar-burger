import {createSlice} from "@reduxjs/toolkit";
import {IFeedData} from "../../types/feedData";
import {onMessageReceived} from "./actions";

interface IPrivateFeedState {
    data: IFeedData | null;
}

export const initialState: IPrivateFeedState = {
    data: null,
};

const privateFeedSlice = createSlice({
    name: 'feed/private',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(onMessageReceived, (state, action) => {
            state.data = action.payload;
        });
    }
});

export default privateFeedSlice.reducer;