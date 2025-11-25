import {createSlice} from "@reduxjs/toolkit";
import {IFeedData} from "../../types/feedData";

interface IPublicFeedState {
    data: IFeedData | null;
}

const initialState: IPublicFeedState = {
    data: null
};

const publicFeedSlice = createSlice({
    name: 'feed/public',
    initialState,
    reducers: {
        setPublicFeedData(state: IPublicFeedState, action) {
            state.data = action.payload;
        },
        removePublicFeedData(state: IPublicFeedState) {
            state.data = null;
        },
    }
});

export const {setPublicFeedData, removePublicFeedData} = publicFeedSlice.actions;
export default publicFeedSlice.reducer;
export type PublicFeedActions =
    | ReturnType<typeof setPublicFeedData>
    | ReturnType<typeof removePublicFeedData>