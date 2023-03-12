import React from "react";

//mantine
import {
    useMantineTheme,
    Text,
    Stack,
    useMantineColorScheme,
} from "@mantine/core";

function AccordioField({ field, content }: { field: string; content: string }) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Stack spacing={0}>
            <Text color={dark ? "#9AA1B9" : "#858DA6"}>{field}</Text>
            <Text color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}>
                {content}
            </Text>
        </Stack>
    );
}

export default AccordioField;
