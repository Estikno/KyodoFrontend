import React from "react";

import { Text, Stack, List } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GoX } from "react-icons/go";

function ListContainer({
    title,
    children,
}: {
    title: string;
    children: JSX.Element | JSX.Element[];
}) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <Stack>
            <Text size={lessThan876px ? "md" : "lg"}>{title}</Text>
            <List icon={<GoX color="red" />}>{children}</List>
        </Stack>
    );
}

export default ListContainer;
