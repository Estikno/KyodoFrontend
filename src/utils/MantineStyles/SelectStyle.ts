//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    input: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        "::placeholder": {
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[7],
        },
    },
    item: {
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
        "&[data-hovered]": {
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[7],
            backgroundColor:
                theme.colorScheme === "dark" ? "#313A43" : "#F8F9FA",
        },
        "&[data-selected]": {
            "&, &:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.teal[9]
                        : theme.colors.teal[1],
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : theme.colors.gray[7],
            },
        },
    },
    dropdown: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        borderColor: theme.colorScheme === "dark" ? "#313A43" : "#F4F5F6",
    },
}));
