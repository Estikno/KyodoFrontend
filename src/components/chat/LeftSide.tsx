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
} from "@mantine/core";

import { AiFillSetting } from "react-icons/ai";

function LeftSide({ children, avatarUrl, username }: { children: JSX.Element | JSX.Element[]; avatarUrl: string | undefined; username: string | undefined}) {
    const theme = useMantineTheme();

    return (
        <Stack
            align="center"
            spacing={0}
            justify="flex-start"
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <FriendsContainer>{children}</FriendsContainer>
            <Group
                sx={{
                    height: "8vh",
                    width: "100%",
                    backgroundColor: theme.colors.dark[6],
                    padding: "10px 12px",
                }}
            >
                <Image
                    width={60}
                    height={60}
                    src={avatarUrl}
                />
                <Text>{username}</Text>
                <Title order={2}>
                    <AiFillSetting />
                </Title>
            </Group>
        </Stack>
    );
}

export default LeftSide;
