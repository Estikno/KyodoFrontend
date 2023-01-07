import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";
import {
    Navbar as Navb,
    Anchor,
    Burger,
    Header,
    MediaQuery,
    createStyles,
    Text,
    Group,
    Button,
    useMantineTheme,
    Stack,
    Divider,
    Title,
    Menu,
    Radio,
    Drawer,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Logo from "../../assets/logo.svg";
import { GiEarthAfricaEurope } from "react-icons/gi";

const useStyles = createStyles((theme) => ({
    navbar: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}));

function Navbar() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [deskMenuOpen, setDeskMenuOpen] = useState(false);

    const lessThan500px = useMediaQuery(`(max-width: 500px)`);

    return (
        <>
            <Header height={lessThan500px ? "8vh" : "10vh"}>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Group
                        position="apart"
                        style={{
                            backgroundColor: theme.colors.dark[9],
                            height: "100%",
                            padding: "0.5rem calc((100vw - 1000px) / 2)",
                        }}
                    >
                        <NavLogo Logo={Logo} />
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size={lessThan500px ? "sm" : "md"}
                            style={{
                                marginLeft: "1rem",
                                marginRight: "1rem",
                            }}
                        />
                    </Group>
                </MediaQuery>
                {/**Computer navbar */}
                <Group
                    className={classes.links}
                    position="apart"
                    style={{
                        backgroundColor: theme.colors.dark[9],
                        height: "100%",
                        padding: "0.5rem calc((100vw - 1000px) / 2)",
                    }}
                >
                    <NavLogo Logo={Logo} />
                    <Group position="center" spacing="xl">
                        <NavLink name="Chat" to="/" />
                        <NavLink name="Profile" to="/profile" />
                        <NavLink name="About" to="/" />
                        <NavLink name="Sign Up" to="/register" />
                    </Group>
                    <Group
                        style={{
                            marginLeft: "1rem",
                            marginRight: "1rem",
                            height: "100%",
                        }}
                    >
                        <Menu
                            opened={deskMenuOpen}
                            onChange={setDeskMenuOpen}
                            withArrow
                        >
                            <Menu.Target>
                                <Stack
                                    style={{
                                        height: "100%",
                                    }}
                                    justify="center"
                                >
                                    <Title
                                        order={1}
                                        style={{
                                            height: "60%",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            setDeskMenuOpen(!deskMenuOpen)
                                        }
                                    >
                                        <GiEarthAfricaEurope />
                                    </Title>
                                </Stack>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Radio.Group
                                    orientation="vertical"
                                    defaultValue="english"
                                >
                                    <Radio
                                        value="english"
                                        label={<Text size="md">English</Text>}
                                    />
                                    <Radio
                                        value="spanish"
                                        label={<Text size="md">Spanish</Text>}
                                    />
                                    <Radio
                                        value="french"
                                        label={<Text size="md">French</Text>}
                                    />
                                    <Radio
                                        value="deutch"
                                        label={<Text size="md">Deutch</Text>}
                                    />
                                </Radio.Group>
                            </Menu.Dropdown>
                        </Menu>
                        <Anchor component={Link} to="/login">
                            <Button style={{ padding: "0 1.5rem" }}>
                                <Text size="xl" weight={700}>
                                    Sign In
                                </Text>
                            </Button>
                        </Anchor>
                    </Group>
                </Group>
            </Header>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="md"
                size="40%"
                position="top"
                overlayColor={
                    theme.colors.dark[8]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <Stack
                    align="center"
                    justify="space-around"
                    sx={() => ({
                        padding: "1rem 0",
                    })}
                >
                    <NavLink name="Chat" to="/"/>
                    <NavLink name="Profile" to="/profile"/>
                    <NavLink name="About" to="/"/>
                    <NavLink name="Sign Up" to="/register"/>
                    <Divider size="md" style={{ width: "90%" }} />
                    <NavLink name="Sign In" to="/login"/>
                </Stack>
            </Drawer>
            
        </>
    );
}

export default Navbar;
