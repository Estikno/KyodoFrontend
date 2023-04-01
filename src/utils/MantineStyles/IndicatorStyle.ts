//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    indicator: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[2],
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
    },
}));