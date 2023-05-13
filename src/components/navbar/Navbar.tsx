import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//components
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";

//images
import logo from "../../assets/logo.png";

//styles
import DrawerStyle from "../../utils/MantineStyles/DrawerStyle";
("../../utils/MantineStyles/DrawerStyle");

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

const pagesData = [
    {
        title: "Download",
        to: "/register",
    },
    {
        title: "Chat",
        to: "/chat",
    },
    {
        title: "Support",
        to: "/register",
    },
    {
        title: "Contact",
        to: "/register",
    },
];

function Navbar() {
    const navigate = useNavigate();

    //mantine
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const { classes, theme } = useStyles();
    const _drawerStyle = DrawerStyle();

    const _theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [deskMenuOpen, setDeskMenuOpen] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const lessThan500px = useMediaQuery(`(max-width: 500px)`);

    const pages = pagesData.map((page) => (
        <Link className={classes.link} to={page.to} key={page.title}>
            {page.title}
        </Link>
    ));

    return (
        <Box>
            <Header
                height={60}
                px="md"
                sx={{
                    backgroundColor: dark
                        ? _theme.colors.dark[1]
                        : _theme.colors.gray[1],
                    borderBottom: dark ? ".1rem solid" : ".12rem solid",
                    borderColor: dark
                        ? theme.colors.dark[0]
                        : theme.colors.gray[1],
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
                        <NavLogo Logo={logo} />

                        <Group
                            sx={{ height: "100%" }}
                            spacing={0}
                            className={classes.hiddenMobile}
                        >
                            {pages}
                        </Group>

                        <Group className={classes.hiddenMobile}>
                            <UnstyledButton onClick={() => toggleColorScheme()}>
                                <Title
                                    order={2}
                                    color={
                                        dark
                                            ? theme.colors.dark[6]
                                            : theme.colors.gray[6]
                                    }
                                >
                                    {dark ? <BiSun /> : <BiMoon />}
                                </Title>
                            </UnstyledButton>
                            <Button
                                className={classes.button}
                                variant="default"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </Button>
                            <Button onClick={() => navigate("/register")}>
                                Sign up
                            </Button>
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
                zIndex={1000000}
                classNames={_drawerStyle.classes}
            >
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider
                        my="sm"
                        color={
                            dark ? theme.colors.dark[0] : theme.colors.gray[1]
                        }
                    />

                    {pages}

                    <Divider
                        my="sm"
                        color={
                            dark ? theme.colors.dark[0] : theme.colors.gray[1]
                        }
                    />

                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            variant="default"
                            className={classes.button}
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Sign up
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default Navbar;
