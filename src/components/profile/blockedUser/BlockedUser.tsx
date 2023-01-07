import React from "react";

import { Group, Image, Text } from "@mantine/core";
import {useMediaQuery} from '@mantine/hooks';

function BlockedUser({name, avatarUrl}: {name: string, avatarUrl: string}) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <Group
            sx={(theme) => ({
                cursor: "pointer",
                borderRadius: theme.radius.md,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                },
            })}
        >
            <Image
                height={lessThan876px ? 40 : 50}
                width={lessThan876px ? 40 : 50}
                src={avatarUrl}
            />
            <Text size={lessThan876px ? "md" : "lg"}>{name}</Text>
        </Group>
    );
}

export default BlockedUser;
