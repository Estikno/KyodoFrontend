import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IApiResponses";

const initialState: IUserInfo[] = [];

export const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        addFriend: (state, action: PayloadAction<IUserInfo>) => {
            state.push(action.payload);
        },
        setFriends: (state, action: PayloadAction<IUserInfo[]>) => {
            /*action.payload.forEach((friend) => {
                state.push(friend);
            });*/

            return action.payload;
        },
        addFriendWithVerification: (
            state,
            action: PayloadAction<IUserInfo>
        ) => {
            const possibleFriend = state.find(
                (friend) => friend.username === action.payload.username
            );

            if (!possibleFriend) state.push(action.payload);;
        },
    },
});

export const { addFriend, setFriends, addFriendWithVerification } = friendSlice.actions;

export default friendSlice.reducer;
