import React from "react";

//options, helpers or utils already made by me
import { toastOptions, specialCharacters } from "../../../utils/configs";

//components
import AccordionField from "./AccordionField";

//mantine
import {
    Stack,
    Image,
    Title,
    UnstyledButton,
    Menu,
    Modal,
    createStyles,
    useMantineTheme,
    useMantineColorScheme,
    Group,
    Text,
    Divider,
    Accordion,
    Select,
    Switch,
    ScrollArea,
    Button,
    TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { BsArrowDownShort, BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";
import { RxDotFilled } from "react-icons/rx";

//styles
import menuStyle from "../../../utils/MantineStyles/MenuStyles";
import accordionStyle from "../../../utils/MantineStyles/AccordionStyle";
import selectStyle from "../../../utils/MantineStyles/SelectStyle";
import switchStyle from "../../../utils/MantineStyles/SwitchStyle";
import TextInputStyle from "../../../utils/MantineStyles/TextInputStyle";
import ModalStyle from "../../../utils/MantineStyles/ModalStyle";

const buttonStyle = createStyles((theme) => ({
    root: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "#E6EBF5",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[7],
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[1],
        },
    },
}));

function SelectBasicOptions() {
    const _pickStyle = selectStyle();

    return (
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
            transitionProps={{ transition: "slide-up", duration: 150 }}
            sx={{ width: "40%" }}
        />
    );
}

function PrivacyOptions({
    field,
    selection,
}: {
    field: string;
    selection: boolean;
}) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const _switchStyle = switchStyle();

    return (
        <Group position="apart" sx={{ width: "100%" }}>
            <Text color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}>
                {field}
            </Text>
            {selection ? (
                <SelectBasicOptions />
            ) : (
                <Switch classNames={_switchStyle.classes} />
            )}
        </Group>
    );
}

const fieldData = [
    {
        field: "Name",
        content: "Patricio",
    },
    {
        field: "Email",
        content: "patrick@gmail.com",
    },
];

const privacyData = [
    {
        field: "Profile Photo",
        selection: true,
    },
    {
        field: "Last seen",
        selection: false,
    },
    {
        field: "Satus",
        selection: true,
    },
    {
        field: "Read receipts",
        selection: false,
    },
    {
        field: "Status",
        selection: true,
    },
];

function ChatGroups({
    handleEditProfile,
}: {
    handleEditProfile: (
        form: UseFormReturnType<
            {
                username: string;
                email: string;
            },
            (values: { username: string; email: string }) => {
                username: string;
                email: string;
            }
        >
    ) => void;
}) {
    //mantine
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const MenuStyles = menuStyle();
    const _accordionStyle = accordionStyle();
    const _switchStyle = switchStyle();
    const _buttonStyle = buttonStyle();
    const _modalStyle = ModalStyle();
    const _textInputStyle = TextInputStyle();

    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);
    const lessThan550px = useMediaQuery(`(max-width: 550px)`);
    const lessThan350px = useMediaQuery(`(max-width: 350px)`);

    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            username: "",
            email: "",
        },

        validate: {
            username: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Username is required";
                }

                if (value.length < 3) {
                    return "Username must be at least 3 characters";
                }

                if (value.length > 20) {
                    return "Username must be less than 20 characters";
                }

                if (specialCharacters.test(value)) {
                    return "Username cannot contain special characters";
                }

                return null;
            },
            email: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Email is required";
                }

                if (!value.includes("@")) {
                    return "Email must contain an @";
                }

                if (!value.includes(".")) {
                    return "Email must contain a .";
                }

                if (value.length > 254) {
                    return "Email must be less than 254 characters";
                }

                return null;
            },
        },
    });

    const items = fieldData.map((item) => (
        <AccordionField {...item} key={item.field} />
    ));

    const privacyItems = privacyData.map((item, index) =>
        index === 0 ? (
            <PrivacyOptions {...item} key={item.field} />
        ) : (
            <>
                <Divider
                    size={"xs"}
                    sx={{ width: "100%" }}
                    color={dark ? theme.colors.dark[0] : theme.colors.gray[0]}
                />
                <PrivacyOptions {...item} key={item.field} />
            </>
        )
    );

    return (
        <Stack
            align="center"
            sx={{
                height: "100%",
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
                        transitionProps={{
                            transition: "slide-up",
                            duration: 150,
                        }}
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
            <ScrollArea sx={{ height: "100%", width: "100%" }} type="scroll">
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
                                <Modal
                                    opened={opened}
                                    onClose={close}
                                    title="Information"
                                    classNames={_modalStyle.classes}
                                    overlayProps={{
                                        blur: 3,
                                    }}
                                    fullScreen={lessThan800px}
                                >
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleEditProfile(form);
                                        }}
                                    >
                                        <Stack>
                                            <TextInput
                                                variant="unstyled"
                                                placeholder="estikno"
                                                label="Username"
                                                radius="md"
                                                size={
                                                    moreThan1800px
                                                        ? "md"
                                                        : lessThan800px
                                                        ? "xs"
                                                        : "sm"
                                                }
                                                classNames={
                                                    _textInputStyle.classes
                                                }
                                                {...form.getInputProps("username")}
                                            />
                                            <TextInput
                                                variant="unstyled"
                                                placeholder="you@email.com"
                                                label="Email"
                                                radius="md"
                                                size={
                                                    moreThan1800px
                                                        ? "md"
                                                        : lessThan800px
                                                        ? "xs"
                                                        : "sm"
                                                }
                                                classNames={
                                                    _textInputStyle.classes
                                                }
                                                {...form.getInputProps("email")}
                                            />
                                            <Group position="center" grow>
                                                <Button
                                                    size={
                                                        moreThan1800px
                                                            ? "md"
                                                            : lessThan800px
                                                            ? "xs"
                                                            : "sm"
                                                    }
                                                    type="submit"
                                                >
                                                    Update info
                                                </Button>
                                            </Group>
                                        </Stack>
                                    </form>
                                </Modal>
                                <Group position="apart" sx={{ width: "100%" }}>
                                    {items[0]}
                                    <Button
                                        compact
                                        leftIcon={<AiFillEdit />}
                                        classNames={_buttonStyle.classes}
                                        onClick={open}
                                    >
                                        Edit
                                    </Button>
                                </Group>
                                {items[1]}
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
                                {privacyItems}
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
            </ScrollArea>
        </Stack>
    );
}

export default ChatGroups;
