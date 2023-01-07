import React from "react";

//mantine
import { Stack, ScrollArea, Drawer, useMantineTheme } from "@mantine/core";

function MobileFriendsContainer({
    open,
    setOpen,
    children,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element | JSX.Element[];
}) {
    const theme = useMantineTheme();

    return (
        <Drawer
            opened={open}
            onClose={() => setOpen(false)}
            padding="md"
            size="90%"
            position="top"
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
        >
            <ScrollArea
                type="scroll"
                sx={{
                    width: "100%",
                    height: "95%",
                }}
                style={{ padding: "5px" }}
            >
                <Stack justify="space-around">
                    {children}
                </Stack>
            </ScrollArea>
        </Drawer>
    );
}

export default MobileFriendsContainer;
