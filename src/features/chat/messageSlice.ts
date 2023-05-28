import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IMessage from "../../interfaces/IMessage";

const initialState: IMessage[] = [];

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            /*action.payload.forEach((friend) => {
                state.push(friend);
            });*/

            return action.payload;
        },
    },
});

export const { addMessage, setMessages } = messageSlice.actions;

export default messageSlice.reducer;