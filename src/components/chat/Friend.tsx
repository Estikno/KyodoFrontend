import React from "react";

//mantine
import { Group, Text, Image, Indicator } from "@mantine/core";

function Friend({ name, avatarUrl}: { name: string; avatarUrl: string;}) {
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
            <Indicator color="green" size={15} withBorder position="bottom-end" offset={7}>
                <Image
                    width={50}
                    height={50}
                    src={avatarUrl}
                />
            </Indicator>
            <Text size={"lg"}>{name}</Text>
        </Group>
    );
}

export default Friend;
