import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: number = -1;

export const selectedFriendSlice = createSlice({
    name: "selectedFriend",
    initialState,
    reducers: {
        setSelectedFriend: (state, action: PayloadAction<number>) => {
            return action.payload;
        },
    },
});

export const { setSelectedFriend } = selectedFriendSlice.actions;

export default selectedFriendSlice.reducer;
