//mantine
import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
    content: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[1],
    },
    header: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[1],
    },
    title: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        fontWeight: 1000,
    },
}));
