import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IConnectedUser {
    username: string;
    connected: boolean;
}

const initialState: IConnectedUser[] = [];

export const connectedUserdSlice = createSlice({
    name: "connectedUser",
    initialState,
    reducers: {
        addConnected: (state, action: PayloadAction<IConnectedUser>) => {
            state.push(action.payload);
        },
        setConnectedUsers: (state, action: PayloadAction<IConnectedUser[]>) => {
            return action.payload;
        },
        modifyConnectedUsers: (state, action: PayloadAction<IConnectedUser>) => {
            const connectedUser = state.find((user) => user.username === action.payload.username);

            if(connectedUser){
                connectedUser.connected = action.payload.connected;
            }
        }
    },
});

export const { addConnected, setConnectedUsers, modifyConnectedUsers } = connectedUserdSlice.actions;

export default connectedUserdSlice.reducer;
