import React from "react";

import FriendsContainer from "./FriendsContainer";

//mantine
import {
    Group,
    Text,
    Stack,
    Image,
    Title,
    useMantineTheme,
    TextInput,
} from "@mantine/core";

import { AiFillSetting } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function LeftSide({
    children,
    avatarUrl,
    username,
}: {
    children: JSX.Element | JSX.Element[];
    avatarUrl: string | undefined;
    username: string | undefined;
}) {
    const theme = useMantineTheme();

    return (
        <Stack
            align="center"
            spacing={0}
            justify="flex-start"
            sx={{
                height: "30vh",
                width: "100%",
                padding: "10px",
            }}
        >
            <Stack
                align="center"
                justify="space-between"
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "red",
                    padding: "10px",
                }}
            >
                <Title
                    order={3}
                    sx={{
                        backgroundColor: "red",
                        width: "100%",
                    }}
                >
                    Chats
                </Title>
                <TextInput
                    placeholder="Search users"
                    icon={<HiOutlineMagnifyingGlass />}
                    sx={{ width: "100%" }}
                />
            </Stack>
            <FriendsContainer>{children}</FriendsContainer>
        </Stack>
    );
}

export default LeftSide;
