import {
    createStyles,
    Title,
    Text,
    Button,
    Stack,
    Group,
    Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[2],
        width: "100%",
        height: "100vh",
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: 250,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[5],

        [theme.fn.smallerThan("sm")]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: 38,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],

        [theme.fn.smallerThan("sm")]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: "auto",
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function Error404() {
    const { classes } = useStyles();

    return (
        <Center className={classes.root}>
            <Stack spacing={"xs"}>
                <Text className={classes.label}>404</Text>
                <Title className={classes.title}>Nothing to see here</Title>
                <Text
                    color="dimmed"
                    size="lg"
                    align="center"
                    className={classes.description}
                >
                    Page you are trying to open does not exist. You may have
                    mistyped the address, or the page has been moved to another
                    URL. If you think this is an error contact support.
                </Text>
                <Group position="center">
                    <Button variant="subtle" size="md">
                        Take me back to home page
                    </Button>
                </Group>
            </Stack>
        </Center>
    );
}
