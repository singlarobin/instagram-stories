import { createSlice } from "@reduxjs/toolkit";
import type { UserDetailsType, UserStorytype } from "./types";

type HomeReducerType = {
    userData: UserDetailsType[];
    storiesData: UserStorytype[];
    usersHavingStoryList: UserDetailsType[];
};

const initialState: HomeReducerType = {
    userData: [],
    storiesData: [],
    usersHavingStoryList: [],
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
        updateUsersHavingStoryList: (state, action) => {
            const data = action?.payload?.data || [];
            state.usersHavingStoryList = data;
        },
    },
});

export const { updateUserList, updateStoriesList, updateUsersHavingStoryList } =
    HomeSlice.actions;

export default HomeSlice.reducer;
