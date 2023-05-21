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

    }
});

export default authSlice.reducer;