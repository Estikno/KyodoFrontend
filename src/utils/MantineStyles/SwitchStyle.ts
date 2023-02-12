//mantine
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    track: {
        borderColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        backgroundColor: "#BABABF",
    },
}));
