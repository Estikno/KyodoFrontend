//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    label: {
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
    },
    input: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[3],
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[3],
    },
}));
