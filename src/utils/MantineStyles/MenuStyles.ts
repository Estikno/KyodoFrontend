//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    dropdown: {
        backgroundColor: theme.colorScheme === "dark" ? "#313A43" : "#FFFFFF",
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[0],
    },
    item: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        "&[data-hovered]": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[4],
            color: "white",
        },
    },
    divider: {
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[1],
    },
}));
