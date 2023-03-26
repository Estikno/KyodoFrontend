//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        fontWeight: "bold",
    },
    header: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[1],
    },
    content: {
        borderRadius: theme.radius.md,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[1],
    },
}));
