import React from "react";

//mantine
import { Group, Text, Image, Indicator, Stack, Avatar, Badge } from "@mantine/core";

function Friend({ name, avatarUrl }: { name: string; avatarUrl: string }) {
    return (
        <Group
            position="apart"
            sx={(theme) => ({
                cursor: "pointer",
                borderRadius: theme.radius.md,
                padding: "10px 15px",

                "&:hover": {
                    backgroundColor: "#36404A",
                },
            })}
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
                    <Text size={"lg"} fw={700}>
                        {name}
                    </Text>
                    <Text size={"xs"}>Hi how are you</Text>
                </Stack>
            </Group>
            <Stack sx={{ height: "100%"}}>
                <Text fz={"sm"} sx={{color: "#A3AFD2"}}>02:50</Text>
                <Badge color="pink">2</Badge>
            </Stack>
        </Group>
    );
}

export default Friend;
