//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    control: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[0],
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
    },
    item: {
        border: "1px solid",
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[0],
        borderRadius: theme.radius.sm,

        "&[data-active]": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[2],
            borderColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[0],
            border: theme.colorScheme === "dark" ? "1px solid" : "",
        },
    },
}));
