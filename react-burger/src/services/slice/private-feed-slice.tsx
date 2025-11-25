import {createSlice} from "@reduxjs/toolkit";
import {IFeedData} from "../../types/feedData";

interface IPrivateFeedState {
    data: IFeedData | null;
}

const initialState: IPrivateFeedState = {
    data: null,
};

const privateFeedSlice = createSlice({
    name: 'feed/private',
    initialState,
    reducers: {
        setPrivateFeedData(state: IPrivateFeedState, action) {
            state.data = action.payload;
        },
        removePrivateFeedData(state: IPrivateFeedState) {
            state.data = null;
        },
    },
});

export const {setPrivateFeedData, removePrivateFeedData} = privateFeedSlice.actions;
export default privateFeedSlice.reducer;
export type PrivateFeedActions =
    | ReturnType<typeof setPrivateFeedData>
    | ReturnType<typeof removePrivateFeedData>