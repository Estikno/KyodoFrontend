import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignOut } from "react-auth-kit";

//images
import logo from "../../assets/logo.webp";
import USAFlag from "../../assets/USAFlag.webp";
import spainFlag from "../../assets/spainFlag.webp";

//mantine
import {
    Stack,
    Image,
    Title,
    Avatar,
    UnstyledButton,
    Tooltip,
    Menu,
    createStyles,
    useMantineTheme,
    useMantineColorScheme,
} from "@mantine/core";

import { MdPersonOutline, MdLanguage } from "react-icons/md";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiSettings2Line, RiLogoutCircleRLine } from "react-icons/ri";
import { BiSun, BiMoon, BiEditAlt } from "react-icons/bi";
import { IconType } from "react-icons/lib";

//styles
import menuStyle from "../../utils/MantineStyles/MenuStyles";

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.md,
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[6],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[3]
                    : theme.colors.gray[3],
        },
    },

    active: {
        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[9],
        },
    },
}));

interface NavbarLinkProps {
    icon: IconType;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({
    icon: Icon,
    label,
    active,
    onClick: _onclick,
}: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Tooltip
            label={label}
            color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
            openDelay={250}
            position="right"
        >
            <UnstyledButton
                onClick={_onclick}
                className={cx(classes.link, { [classes.active]: active })}
            >
                <Title
                    order={2}
                    color={dark ? theme.colors.dark[6] : theme.colors.gray[6]}
                >
                    <Icon />
                </Title>
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata: NavbarLinkProps[] = [
    { icon: MdPersonOutline, label: "Profile" },
    { icon: HiOutlineChatBubbleOvalLeftEllipsis, label: "Chats" },
    { icon: RiSettings2Line, label: "Settings" },
];

function ChatNavbar({
    setSelectedWindow,
    selectedWindow,
    //manual_disconnect,
}: {
    setSelectedWindow: React.Dispatch<React.SetStateAction<number>>;
    selectedWindow: number;
    //manual_disconnect: () => void
}) {
    const menuClass = menuStyle();
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const _signOut = useSignOut();
    const navigate = useNavigate();

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === selectedWindow}
            onClick={() => setSelectedWindow(index)}
        />
    ));

    return (
        <Stack
            align="center"
            justify="space-between"
            sx={{
                height: "100%",
                width: "100%",
                paddingTop: ".7rem",
                paddingBottom: ".7rem",
                paddingLeft: ".7rem",
                paddingRight: ".7rem",
            }}
        >
            <Image src={logo} width={30} height={"auto"} />
            <Stack align="center" justify="space-between" spacing={"md"}>
                {links}
            </Stack>
            <Stack align="center" justify="space-between" spacing={"md"}>
                <Menu
                    shadow={"md"}
                    position="top-start"
                    offset={10}
                    width={150}
                    classNames={menuClass.classes}
                    transitionProps={{ transition: "slide-up", duration: 150 }}
                >
                    <Menu.Target>
                        <UnstyledButton
                            sx={(theme) => ({
                                backgroundColor: false
                                    ? dark
                                        ? theme.colors.dark[3]
                                        : theme.colors.gray[3]
                                    : "#ffffff0",
                                padding: ".7rem 1.05rem .56rem 1.05rem",
                                borderRadius: theme.radius.md,
                            })}
                        >
                            <Title
                                order={2}
                                color={
                                    dark
                                        ? theme.colors.dark[6]
                                        : theme.colors.gray[6]
                                }
                            >
                                <MdLanguage />
                            </Title>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            icon={<Image src={spainFlag} width="18px" />}
                        >
                            Spanish
                        </Menu.Item>
                        <Menu.Item icon={<Image src={USAFlag} width="18px" />}>
                            English
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Tooltip
                    label="Dark / Light Mode"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
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
                </Tooltip>

                <Menu
                    shadow={"md"}
                    position="top-start"
                    offset={10}
                    width={150}
                    classNames={menuClass.classes}
                    transitionProps={{ transition: "slide-up", duration: 150 }}
                >
                    <Menu.Target>
                        <UnstyledButton
                            sx={(theme) => ({
                                backgroundColor: false
                                    ? dark
                                        ? theme.colors.dark[3]
                                        : theme.colors.gray[3]
                                    : "#ffffff0",
                                padding: "8px 8px",
                                borderRadius: theme.radius.md,
                            })}
                        >
                            <Avatar radius="xl" size="md" color="blue" />
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            rightSection={<BiEditAlt />}
                            onClick={(e) => setSelectedWindow(0)}
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            rightSection={<RiSettings2Line />}
                            onClick={(e) => setSelectedWindow(2)}
                        >
                            Settings
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            rightSection={<RiLogoutCircleRLine />}
                            onClick={(e) => {
                                //manual_disconnect();
                                _signOut();
                                navigate("/login");
                            }}
                        >
                            Log out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Stack>
        </Stack>
    );
}

export default ChatNavbar;
