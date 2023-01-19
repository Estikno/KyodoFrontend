import React from "react";

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
import { RiSettings2Line, RiGroupLine, RiContactsLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";

const menuStyle = createStyles((theme) => ({
    dropdown: {
        backgroundColor: "#313A43",
    },
    item: {
        "&[data-hovered]": {
            backgroundColor: "#7269EF",
            color: "white",
        },
    },
}));

function ChatNavbar() {
    const menuClass = menuStyle();
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Stack
            align="center"
            justify="space-between"
            sx={{
                height: "100%",
                width: "100%",
                paddingTop: "10px",
                paddingBottom: "10px",
            }}
        >
            <Image
                src={
                    "https://res.cloudinary.com/kyodo/image/upload/v1673968570/kyodo/icons/Logo_jlsedv.png"
                }
                width={30}
                height={"auto"}
            />
            <Stack align="center" justify="space-between" spacing={"md"}>
                <Tooltip
                    label="Profile"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
                    <UnstyledButton
                        sx={(theme) => ({
                            backgroundColor: true
                                ? dark
                                    ? theme.colors.dark[3]
                                    : theme.colors.gray[3]
                                : "#ffffff0",
                            padding: "10px 15px",
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
                            <MdPersonOutline />
                        </Title>
                    </UnstyledButton>
                </Tooltip>

                <Tooltip
                    label="Chats"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
                    <UnstyledButton
                        sx={(theme) => ({
                            backgroundColor: false
                                ? dark
                                    ? theme.colors.dark[3]
                                    : theme.colors.gray[3]
                                : "#ffffff0",
                            padding: "10px 15px",
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
                            <HiOutlineChatBubbleOvalLeftEllipsis />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip
                    label="Groups"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
                    <UnstyledButton
                        sx={(theme) => ({
                            backgroundColor: false
                                ? dark
                                    ? theme.colors.dark[3]
                                    : theme.colors.gray[3]
                                : "#ffffff0",
                            padding: "10px 15px",
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
                            <RiGroupLine />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip
                    label="Contacts"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
                    <UnstyledButton
                        sx={(theme) => ({
                            backgroundColor: false
                                ? dark
                                    ? theme.colors.dark[3]
                                    : theme.colors.gray[3]
                                : "#ffffff0",
                            padding: "10px 15px",
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
                            <RiContactsLine />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip
                    label="Settings"
                    color={dark ? theme.colors.dark[8] : theme.colors.gray[8]}
                    openDelay={250}
                >
                    <UnstyledButton
                        sx={(theme) => ({
                            backgroundColor: false
                                ? dark
                                    ? theme.colors.dark[3]
                                    : theme.colors.gray[3]
                                : "#ffffff0",
                            padding: "10px 15px",
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
                            <RiSettings2Line />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
            </Stack>
            <Stack align="center" justify="space-between" spacing={"md"}>
                <Menu
                    shadow={"md"}
                    position="top-start"
                    offset={20}
                    width={150}
                    classNames={menuClass.classes}
                >
                    <Menu.Target>
                        <UnstyledButton
                            sx={(theme) => ({
                                backgroundColor: false
                                    ? dark
                                        ? theme.colors.dark[3]
                                        : theme.colors.gray[3]
                                    : "#ffffff0",
                                padding: "10px 15px 8px 15px",
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
                            icon={
                                <Image
                                    src={
                                        "https://res.cloudinary.com/kyodo/image/upload/v1673983487/kyodo/icons/spainFlag_yuocch.png"
                                    }
                                    width="18px"
                                />
                            }
                        >
                            Spanish
                        </Menu.Item>
                        <Menu.Item
                            icon={
                                <Image
                                    src={
                                        "https://res.cloudinary.com/kyodo/image/upload/v1673983488/kyodo/icons/USAFlag_xttb5j.png"
                                    }
                                    width="18px"
                                />
                            }
                        >
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
                            <BiSun />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
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
            </Stack>
        </Stack>
    );
}

export default ChatNavbar;
