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
    Accordion,
    Select,
    Switch,
} from "@mantine/core";

import { BsArrowDownShort, BsDot } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";
import { RxDotFilled } from "react-icons/rx";

//styles
import menuStyle from "../../../utils/MantineStyles/MenuStyles";
import accordionStyle from "../../../utils/MantineStyles/AccordionStyles";

const pickStyle = createStyles((theme) => ({
    input: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        "::placeholder": {
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[7],
        },
    },
    item: {
        color: theme.colorScheme === "dark" ? "#9AA1B9" : "#858DA6",
        "&[data-hovered]": {
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[7],
            backgroundColor:
                theme.colorScheme === "dark" ? "#313A43" : "#F8F9FA",
        },
        "&[data-selected]": {
            "&, &:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.teal[9]
                        : theme.colors.teal[1],
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : theme.colors.gray[7],
            },
        },
    },
    dropdown: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        borderColor: theme.colorScheme === "dark" ? "#313A43" : "#F4F5F6",
    },
}));

const switchStyle = createStyles((theme) => ({
    track: {
        borderColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        backgroundColor: "#BABABF",
    },
}));

function ChatGroups() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const MenuStyles = menuStyle();
    const _accordionStyle = accordionStyle();
    const _pickStyle = pickStyle();
    const _switchStyle = switchStyle();

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
            <Accordion
                variant="separated"
                defaultValue="Personal Info"
                sx={{ width: "100%" }}
                classNames={_accordionStyle.classes}
                transitionDuration={250}
            >
                <Accordion.Item value="Personal Info">
                    <Accordion.Control>Personal Info</Accordion.Control>
                    <Accordion.Panel>
                        <Stack
                            sx={{ width: "100%", paddingTop: "10px" }}
                            align="flex-start"
                        >
                            <Stack spacing={0}>
                                <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                    Name
                                </Text>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Patricio
                                </Text>
                            </Stack>
                            <Stack spacing={0}>
                                <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                    Email
                                </Text>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    patrick@gmail.com
                                </Text>
                            </Stack>
                            <Stack spacing={0}>
                                <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                    Localtion
                                </Text>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    florida
                                </Text>
                            </Stack>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Privacy">
                    <Accordion.Control>Privacy</Accordion.Control>
                    <Accordion.Panel>
                        <Stack
                            sx={{ width: "100%", paddingTop: "10px" }}
                            align="flex-start"
                        >
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Profile Photo
                                </Text>
                                <Select
                                    data={[
                                        {
                                            value: "everyone",
                                            label: "Everyone",
                                        },
                                        {
                                            value: "selected",
                                            label: "Selected",
                                        },
                                        {
                                            value: "sobody",
                                            label: "Nobody",
                                        },
                                    ]}
                                    variant="filled"
                                    classNames={_pickStyle.classes}
                                    defaultValue="everyone"
                                    transition="slide-up"
                                    transitionDuration={40}
                                    transitionTimingFunction="ease"
                                    sx={{ width: "40%" }}
                                />
                            </Group>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Last seen
                                </Text>
                                <Switch classNames={_switchStyle.classes} />
                            </Group>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Status
                                </Text>
                                <Select
                                    data={[
                                        {
                                            value: "everyone",
                                            label: "Everyone",
                                        },
                                        {
                                            value: "selected",
                                            label: "Selected",
                                        },
                                        {
                                            value: "sobody",
                                            label: "Nobody",
                                        },
                                    ]}
                                    variant="filled"
                                    classNames={_pickStyle.classes}
                                    defaultValue="everyone"
                                    transition="slide-up"
                                    transitionDuration={40}
                                    transitionTimingFunction="ease"
                                    sx={{ width: "40%" }}
                                />
                            </Group>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Read receipts
                                </Text>
                                <Switch classNames={_switchStyle.classes} />
                            </Group>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Status
                                </Text>
                                <Select
                                    data={[
                                        {
                                            value: "everyone",
                                            label: "Everyone",
                                        },
                                        {
                                            value: "selected",
                                            label: "Selected",
                                        },
                                        {
                                            value: "sobody",
                                            label: "Nobody",
                                        },
                                    ]}
                                    variant="filled"
                                    classNames={_pickStyle.classes}
                                    defaultValue="everyone"
                                    transition="slide-up"
                                    transitionDuration={40}
                                    transitionTimingFunction="ease"
                                    sx={{ width: "40%" }}
                                />
                            </Group>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Security">
                    <Accordion.Control>Security</Accordion.Control>
                    <Accordion.Panel>
                        <Stack
                            sx={{ width: "100%", paddingTop: "10px" }}
                            align="flex-start"
                        >
                            <Group position="apart" sx={{ width: "100%" }}>
                                <Text
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Show security notification
                                </Text>
                                <Switch classNames={_switchStyle.classes} />
                            </Group>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Help">
                    <Accordion.Control>Help</Accordion.Control>
                    <Accordion.Panel>
                        <Stack
                            sx={{ width: "100%", paddingTop: "10px" }}
                            align="flex-start"
                        >
                            <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                FAQs
                            </Text>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                Contact
                            </Text>
                            <Divider
                                size={"xs"}
                                sx={{ width: "100%" }}
                                color={
                                    dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0]
                                }
                            />
                            <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                Terms & Privacy policy
                            </Text>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );
}

export default ChatGroups;
