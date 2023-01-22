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
    Group,
    Text,
    Divider,
} from "@mantine/core";

import { BsArrowDownShort, BsDot } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";
import { RxDotFilled } from "react-icons/rx";

//styles
import menuStyle from "../../../utils/MantineStyles/MenuStyles";

function ChatGroups() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const MenuStyles = menuStyle();

    return (
        <Stack
            align="center"
            sx={{
                height: "100vh",
                width: "100%",
                padding: "20px",
            }}
            spacing="xl"
        >
            <Title
                order={3}
                sx={{
                    width: "100%",
                }}
                color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
            >
                Settings
            </Title>
            <Stack spacing={"xs"} align="center" sx={{ width: "100%" }}>
                <Image
                    src={
                        "https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/DefaultAvatar.png"
                    }
                    width="120px"
                    alt="Profile image"
                />
                <Stack align={"center"} spacing={0}>
                    <Text
                        fw={700}
                        fz={"lg"}
                        color={
                            dark ? theme.colors.dark[7] : theme.colors.gray[7]
                        }
                    >
                        Patricio estrella
                    </Text>
                    <Menu
                        shadow={"md"}
                        position="bottom-start"
                        width={150}
                        transition="slide-up"
                        classNames={MenuStyles.classes}
                    >
                        <Menu.Target>
                            <UnstyledButton>
                                <Group spacing={0} position="center">
                                    <Text
                                        fz={"lg"}
                                        color={dark ? "#9AA1B9" : "#858DA6"}
                                    >
                                        Active
                                    </Text>
                                    <BsArrowDownShort
                                        color={dark ? "#9AA1B9" : "#858DA6"}
                                    />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                icon={<RxDotFilled color="lightgreen" />}
                            >
                                Available
                            </Menu.Item>
                            <Menu.Item icon={<CgUnavailable color="red" />}>
                                Busy
                            </Menu.Item>
                            <Menu.Item icon={<RxDotFilled color="red" />}>
                                Disconnected
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Stack>
            </Stack>
            <Divider
                size={"xs"}
                sx={{ width: "100%" }}
                color={dark ? theme.colors.dark[0] : theme.colors.gray[0]}
            />
        </Stack>
    );
}

export default ChatGroups;
