import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IApiResponses";

const initialState: IUserInfo = {
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
        setUser: (state, action: PayloadAction<IUserInfo>) => {
            /*state.avatarUrl = action.payload.avatarUrl;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.verified = action.payload.verified;
            state.idRoom = action.payload.idRoom;*/
            return {...action.payload}
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
