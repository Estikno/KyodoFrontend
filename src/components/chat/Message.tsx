import React from "react";

//mantine
import {
    Group,
    Text,
    useMantineTheme,
    useMantineColorScheme,
    Stack,
    Avatar,
} from "@mantine/core";

function Message({ position, message, displayAvatar }: { position: string; message: string; displayAvatar: boolean}) {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Stack
            align={position === "r" ? "flex-end" : "flex-start"}
            sx={{
                paddingLeft: position === "r" ? "0" : "1rem",
                paddingRight: position === "r" ? "1rem" : "0",
            }}
            spacing={"xs"}
        >
            <Group
                sx={{
                    width: "100%",
                    padding: "0 2rem",
                }}
                position={position === "r" ? "right" : "left"}
            >
                <Text
                    ta={position === "r" ? "right" : "left"}
                    sx={{
                        maxWidth: "100%",
                        height: "100%",
                        borderRadius: theme.radius.md,
                        backgroundColor: dark
                            ? position === "r"
                                ? theme.colors.dark[0]
                                : theme.colors.dark[4]
                            : position === "r"
                            ? theme.colors.gray[1]
                            : theme.colors.gray[4],
                        padding: "10px",
                        color: dark
                            ? theme.colors.dark[7]
                            : theme.colors.gray[7],
                    }}
                >
                    {message}
                </Text>
            </Group>
            <Avatar radius={"xl"} color="blue" sx={{display: (displayAvatar) ? "" : "none"}} />
        </Stack>
    );
}

export default Message;
