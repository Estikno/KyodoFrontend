//mantine
import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[1],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        borderWidth: rem(2),
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.colors.gray[0],
        },
    },
}));