import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignOut } from "react-auth-kit";

//images
import USAFlag from "../../assets/USAFlag.webp";
import spainFlag from "../../assets/spainFlag.webp";

//mantine
import {
    Stack,
    Image,
    Title,
    Avatar,
    UnstyledButton,
    Group,
    Menu,
    createStyles,
    useMantineTheme,
    useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

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

    const lessthan400px = useMediaQuery(`(max-width: 400px)`);

    return (
        <UnstyledButton
            onClick={_onclick}
            className={cx(classes.link, { [classes.active]: active })}
        >
            <Title
                order={lessthan400px ? 3 : 2}
                color={dark ? theme.colors.dark[6] : theme.colors.gray[6]}
            >
                <Icon />
            </Title>
        </UnstyledButton>
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
    showChatSmall,
}: {
    setSelectedWindow: React.Dispatch<React.SetStateAction<number>>;
    selectedWindow: number;
    showChatSmall: boolean
}) {
    const menuClass = menuStyle();
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const lessthan991px = useMediaQuery(`(max-width: 991px)`);
    const lessthan400px = useMediaQuery(`(max-width: 400px)`);

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
        <Group
            position="apart"
            sx={{
                height: "10vh",
                width: "100%",
                paddingTop: ".7rem",
                paddingBottom: ".7rem",
                paddingLeft: ".7rem",
                paddingRight: ".7rem",
                backgroundColor: dark
                    ? theme.colors.dark[0]
                    : theme.colors.gray[0],
                display: lessthan991px ? (showChatSmall ? "none" : "") : "none",
            }}
        >
            {links}
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
                            display: lessthan400px ? "none" : "",
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
                    <Menu.Item icon={<Image src={spainFlag} width="18px" />}>
                        Spanish
                    </Menu.Item>
                    <Menu.Item icon={<Image src={USAFlag} width="18px" />}>
                        English
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <UnstyledButton
                onClick={() => toggleColorScheme()}
                sx={{ display: lessthan400px ? "none" : "" }}
            >
                <Title
                    order={2}
                    color={dark ? theme.colors.dark[6] : theme.colors.gray[6]}
                >
                    {dark ? <BiSun /> : <BiMoon />}
                </Title>
            </UnstyledButton>

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
                            padding: ".56rem",
                            borderRadius: theme.radius.md,
                        })}
                    >
                        <Avatar
                            radius="xl"
                            size={lessthan400px ? "sm" : "md"}
                            color="blue"
                        />
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
                            _signOut();
                            navigate("/login");
                        }}
                    >
                        Log out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default ChatNavbar;
