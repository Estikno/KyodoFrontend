import React from "react";

//mantine
import { Stack, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function FriendsContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
    const lessThan500px = useMediaQuery(`(max-width: 500px)`);

    return (
        <ScrollArea
            type="scroll"
            sx={{
                width: "100%",
                height: "100%",
            }}
            style={{ padding: "5px" }}
        >
            <Stack spacing={5}>{children}</Stack>
        </ScrollArea>
    );
}

export default FriendsContainer;
