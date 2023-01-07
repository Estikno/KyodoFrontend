import React from "react";

//mantine
import { Group, Text, useMantineTheme } from "@mantine/core";

function Message({position, message}: {position: string; message: string}) {
    const theme = useMantineTheme();

    return (
        <Group
            sx={{
                width: "100%",
            }}
            position={position === "r" ? "right" : "left"}
        >
            <Text
                sx={{
                    width: "47%",
                    height: "100%",
                    borderRadius: theme.radius.md,
                    backgroundColor: theme.colors.dark[1],
                    padding: "10px",
                }}
            >
                {message}
            </Text>
        </Group>
    );
}

export default Message;
