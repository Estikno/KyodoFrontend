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
                height: lessThan500px ? "80vh" : "77vh",
            }}
            style={{ padding: "5px" }}
        >
            <Stack spacing="xs">{children}</Stack>
        </ScrollArea>
    );
}

export default FriendsContainer;
