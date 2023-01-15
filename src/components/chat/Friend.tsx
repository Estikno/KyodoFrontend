import React from "react";

//mantine
import { Group, Text, Image, Indicator, Stack } from "@mantine/core";

function Friend({ name, avatarUrl }: { name: string; avatarUrl: string }) {
    return (
        <Group
            sx={(theme) => ({
                cursor: "pointer",
                borderRadius: theme.radius.md,
                padding: "5px",

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                },
            })}
        >
            <Indicator
                color="green"
                size={15}
                withBorder
                position="bottom-end"
                offset={7}
            >
                <Image width={50} height={50} src={avatarUrl} />
            </Indicator>
            <Stack spacing={"xs"} sx={{ height: "100%"}}>
                <Text size={"lg"}>{name}</Text>
                <Text size={"xs"}>Hi how are you</Text>
            </Stack>
        </Group>
    );
}

export default Friend;
