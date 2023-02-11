//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
    },
    input: {
        color: theme.colorScheme === "dark" ? "#9BB0C7" : "#7A7FA6",
        paddingLeft: "15px",
        paddingRight: "15px",
        "::placeholder": {
            color: theme.colorScheme === "dark" ? "#9BB0C7" : "#7A7FA6",
        },
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        borderRadius: theme.radius.md,
    },
    label: {
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
        paddingLeft: "5px",
    },
}));
