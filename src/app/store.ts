import { configureStore } from "@reduxjs/toolkit";

//reducers
import AuthReducer from "../features/auth/authSlice";
import FriendReducer from "../features/chat/friendSlice";
import MessageSlice from "../features/chat/messageSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        friend: FriendReducer,
        message: MessageSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
