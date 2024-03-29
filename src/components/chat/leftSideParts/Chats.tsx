import React from "react";

//redux
import { setSelectedFriend } from "../../../features/chat/selectedFriendSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

//components
import FriendsContainer from "../FriendsContainer";
import Friend from "../Friend";

//mantine
import {
    Stack,
    Title,
    useMantineTheme,
    TextInput,
    useMantineColorScheme,
} from "@mantine/core";

import { AiFillSetting } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function LeftSide() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const dispatch = useAppDispatch();
    const friends = useAppSelector((state) => state.friend);
    const connectedUsers = useAppSelector((state) => state.connectedUser);

    const getIfConnected = (username: string): boolean => {
        let connected: boolean = false;

        connectedUsers.forEach((user) => {
            if(username === user.username) connected = user.connected;
        });

        return connected;
    };

    return (
        <Stack
            align="center"
            spacing={0}
            justify="flex-start"
            sx={{
                height: "100%",
                width: "100%",
                padding: "10px",
            }}
        >
            <Stack
                align="center"
                justify="space-between"
                sx={{
                    height: "14vh",
                    width: "100%",
                    padding: "10px",
                }}
            >
                <Title
                    order={3}
                    sx={{
                        width: "100%",
                    }}
                    color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
                >
                    Chats
                </Title>
                <TextInput
                    placeholder="Search users"
                    icon={
                        <HiOutlineMagnifyingGlass
                            color={dark ? "#9BB0C7" : "#7A7FA6"}
                        />
                    }
                    sx={(theme) => ({
                        width: "100%",
                        backgroundColor: dark
                            ? theme.colors.dark[0]
                            : "#E6EBF5",
                        borderRadius: theme.radius.md,
                        input: {
                            color: dark ? "#9BB0C7" : "#7A7FA6",
                            "::placeholder": {
                                color: dark ? "#9BB0C7" : "#7A7FA6",
                            },
                        },
                    })}
                    variant="unstyled"
                    size="md"
                />
            </Stack>
            <FriendsContainer>
                {friends.map((friend, index) => (
                    <Friend
                        name={friend.username}
                        key={friend.username}
                        avatarUrl={friend.avatarUrl}
                        onClick={() => dispatch(setSelectedFriend(index))}
                        connected={getIfConnected(friend.username)}
                    />
                ))}
            </FriendsContainer>
        </Stack>
    );
}

export default LeftSide;
