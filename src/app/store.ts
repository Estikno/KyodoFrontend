import { configureStore } from "@reduxjs/toolkit";

//reducers
import AuthReducer from "../features/auth/authSlice";
import FriendReducer from "../features/chat/friendSlice";
import MessageSlice from "../features/chat/messageSlice";
import SelectedFriendSlice from '../features/chat/selectedFriendSlice';
import ConnectedUserSlice from '../features/chat/connectedUserSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        friend: FriendReducer,
        message: MessageSlice,
        selectedFriend: SelectedFriendSlice,
        connectedUser: ConnectedUserSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
