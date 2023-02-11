import React, { useState } from "react";
import { Link } from "react-router-dom";

//components
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";

//mantine
import {
    Burger,
    Header,
    createStyles,
    Group,
    Button,
    useMantineTheme,
    Divider,
    Drawer,
    Box,
    ScrollArea,
    useMantineColorScheme,
    Center,
    UnstyledButton,
    Title,
} from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";

//icons
import Logo from "../../assets/logo.svg";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BiSun, BiMoon } from "react-icons/bi";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.colors.gray[0],
        }),
    },

    button: {
        borderColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[2],
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[0],

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[1],
        }),
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const { classes, theme } = useStyles();

    const _theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [deskMenuOpen, setDeskMenuOpen] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const lessThan500px = useMediaQuery(`(max-width: 500px)`);

    return (
        <Box>
            <Header
                height={60}
                px="md"
                sx={{
                    backgroundColor: dark
                        ? _theme.colors.dark[1]
                        : _theme.colors.gray[1],
                }}
            >
                <Center sx={{ width: "100%", height: "100%" }}>
                    <Group
                        position="apart"
                        sx={{
                            height: "100%",
                            width: "100%",
                            padding: "0 calc((100vw - 1000px) / 3)",
                        }}
                    >
                        <NavLogo
                            Logo={
                                "https://res.cloudinary.com/kyodo/image/upload/v1674571454/kyodo/icons/logo_dj9gkd.png"
                            }
                        />

                        <Group
                            sx={{ height: "100%" }}
                            spacing={0}
                            className={classes.hiddenMobile}
                        >
                            <Link className={classes.link} to={"/register"}>
                                Download
                            </Link>
                            <Link className={classes.link} to={"/register"}>
                                Chat
                            </Link>
                            <Link className={classes.link} to={"/register"}>
                                Support
                            </Link>
                            <Link className={classes.link} to={"/register"}>
                                Contact
                            </Link>
                        </Group>

                        <Group className={classes.hiddenMobile}>
                            <UnstyledButton onClick={() => toggleColorScheme()} >
                                <Title
                                    order={2}
                                    color={
                                        dark
                                            ? theme.colors.dark[6]
                                            : theme.colors.gray[6]
                                    }
                                    ta={"center"}
                                >
                                    {dark ? <BiSun /> : <BiMoon />}
                                </Title>
                            </UnstyledButton>
                            <Button
                                className={classes.button}
                                variant="default"
                            >
                                Log in
                            </Button>
                            <Button>Sign up</Button>
                        </Group>

                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            className={classes.hiddenDesktop}
                        />
                    </Group>
                </Center>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <Link className={classes.link} to={"/register"}>
                        Hola
                    </Link>
                    <Link className={classes.link} to={"/register"}>
                        Learn
                    </Link>
                    <Link className={classes.link} to={"/register"}>
                        Academy
                    </Link>

                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <Group position="center" grow pb="xl" px="md">
                        <Button variant="default" className={classes.button}>
                            Log in
                        </Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default Navbar;
