//mantine
import {
    createStyles,
    Text,
    Container,
    ActionIcon,
    Group,
    Image,
    useMantineTheme,
    useMantineColorScheme,
} from "@mantine/core";

//icons
import { TfiTwitter } from "react-icons/tfi";
import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
    footer: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[2],
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[2]
        }`,
        width: "100%",
    },

    logo: {
        maxWidth: 200,

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
            textAlign: "center",
        },
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },

    groups: {
        display: "flex",
        flexWrap: "wrap",

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: "block",
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        "&:hover": {
            textDecoration: "underline",
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: `calc(${theme.spacing.xs} / 2)`,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
    },

    afterFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[1]
        }`,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },

    social: {
        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

export function Footer({ data }: FooterLinksProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<"a">
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Image
                        src={
                            "https://res.cloudinary.com/kyodo/image/upload/v1674571454/kyodo/icons/logo_dj9gkd.png"
                        }
                        width={30}
                    />
                    <Text
                        size="xs"
                        color={dark ? "#9AA1B9" : "#858DA6"}
                        className={classes.description}
                    >
                        Build fully functional accessible web applications
                        faster than ever
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color={dark ? "#9AA1B9" : "#858DA6"} size="sm">
                    © 2020 mantine.dev. All rights reserved.
                </Text>

                <Group
                    spacing={0}
                    className={classes.social}
                    position="right"
                    noWrap
                >
                    <ActionIcon size="lg">
                        <TfiTwitter size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <FiYoutube size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <FaInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}

export default Footer;
