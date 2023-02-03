import React from "react";

//mantine
import {
    Group,
    Text,
    Image,
    Indicator,
    Stack,
    Avatar,
    Badge,
    useMantineTheme,
    useMantineColorScheme
} from "@mantine/core";

function Friend({ name, avatarUrl, onClick: _onClick }: { name: string; avatarUrl: string; onClick(): void; }) {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Group
            position="apart"
            sx={(theme) => ({
                cursor: "pointer",
                borderRadius: theme.radius.md,
                padding: "10px 15px",

                "&:hover": {
                    backgroundColor: dark ? theme.colors.dark[0] : "#E6EBF5",
                },
            })}
            onClick={_onClick}
        >
            <Group>
               <Indicator
                    color="green"
                    size={12}
                    withBorder
                    position="bottom-end"
                    offset={7}
                >
                    <Avatar src={avatarUrl} radius="xl" size={"md"} />
                </Indicator>
                <Stack spacing={5} sx={{ height: "100%" }}>
                    <Text size={"lg"} fw={700} color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}>
                        {name}
                    </Text>
                    <Text size={"xs"} color={dark ? "#8B94B6" : "#8186A0"}>Hi how are you</Text>
                </Stack>
            </Group>
            <Stack sx={{ height: "100%" }}>
                <Text fz={"sm"} sx={{ color: dark ? "#8B94B6" : "#8186A0" }}>
                    02:50
                </Text>
                <Badge color={"pink"}>2</Badge>
            </Stack>
        </Group>
    ); 
}

export default Friend;
