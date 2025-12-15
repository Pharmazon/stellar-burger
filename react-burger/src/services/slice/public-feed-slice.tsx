import {createSlice} from "@reduxjs/toolkit";
import {IFeedData} from "../../types/feedData";
import {onMessageReceived} from "./actions";

interface IPublicFeedState {
    data: IFeedData | null;
}

export const initialState: IPublicFeedState = {
    data: null
};

const publicFeedSlice = createSlice({
    name: 'feed/public',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(onMessageReceived, (state, action) => {
            state.data = action.payload;
        });
    }
});

export default publicFeedSlice.reducer;