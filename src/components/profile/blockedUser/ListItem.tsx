import React from "react";

import { Text, List } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function ListItem({ text }: { text: string }) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);
    return (
        <List.Item>
            <Text size={lessThan876px ? "sm" : "md"}>{text}</Text>
        </List.Item>
    );
}

export default ListItem;
