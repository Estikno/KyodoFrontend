import React from "react";

import FriendsContainer from "../FriendsContainer";

//mantine
import {
    Group,
    Text,
    Stack,
    Image,
    Title,
    useMantineTheme,
    TextInput,
    useMantineColorScheme,
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
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

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
            <FriendsContainer>{children}</FriendsContainer>
        </Stack>
    );
}

export default LeftSide;
