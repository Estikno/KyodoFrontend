import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    username: string;
    email: string;
    avatarUrl: string;
    verified: boolean;
    idRoom: string;
}

const initialState: IAuthState = {
    username: "",
    email: "",
    avatarUrl: "",
    verified: true,
    idRoom: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<IAuthState>) => {
            state.avatarUrl = action.payload.avatarUrl;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.verified = action.payload.verified;
            state.idRoom = action.payload.idRoom;
        },
    },
});

export const { set } = authSlice.actions;

export default authSlice.reducer;
