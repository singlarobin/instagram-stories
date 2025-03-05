import { createSlice } from "@reduxjs/toolkit";
import type { UserDetailsType, UserStorytype } from "./types";

type HomeReducerType = {
    userData: UserDetailsType[];
    storiesData: UserStorytype[];
};

const initialState: HomeReducerType = {
    userData: [],
    storiesData: [],
};

export const HomeSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {
        updateUserList: (state, action) => {
            const data = action?.payload?.data || [];
            state.userData = data;
        },
        updateStoriesList: (state, action) => {
            const data = action?.payload?.data || [];
            state.storiesData = data;
        },
    },
});

export const { updateUserList, updateStoriesList } = HomeSlice.actions;

export default HomeSlice.reducer;
