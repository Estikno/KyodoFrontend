import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import cookie from "js-cookie";

//options, helpers or utils already made by me
import { toastOptions, specialCharacters } from "../../../utils/configs";
import {
    removeAvatar as REMOVEAVATAR,
    IMinimumInfo,
} from "../../../graphql/chat";
import { IAuthResponse } from "../../../interfaces/IApiResponses";
import { changeAvatar } from "../../../utils/callApi";

//components
import AccordionField from "./AccordionField";

//mantine
import {
    Stack,
    Image,
    Title,
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
    Indicator,
    rem,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

import { BiPencil, BiErrorCircle } from "react-icons/bi";
import { BsArrowDownShort, BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";
import { RxDotFilled } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";

//styles
import menuStyle from "../../../utils/MantineStyles/MenuStyles";
import accordionStyle from "../../../utils/MantineStyles/AccordionStyle";
import selectStyle from "../../../utils/MantineStyles/SelectStyle";
import switchStyle from "../../../utils/MantineStyles/SwitchStyle";
import TextInputStyle from "../../../utils/MantineStyles/TextInputStyle";
import ModalStyle from "../../../utils/MantineStyles/ModalStyle";
import IndicatorStyle from "../../../utils/MantineStyles/IndicatorStyle";
import DropZoneStyle from "../../../utils/MantineStyles/DropzoneStyle";

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
    avatarUrl,
    username,
    setVisible,
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
    avatarUrl: string;
    username: string;
    setVisible: (value: boolean) => void;
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
    const _indicatorStyle = IndicatorStyle();
    const _dropzonenStyle = DropZoneStyle();

    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);
    const lessThan550px = useMediaQuery(`(max-width: 550px)`);
    const lessThan350px = useMediaQuery(`(max-width: 350px)`);

    const [opened, { open, close }] = useDisclosure(false);
    const [openedModal2, { open: openModal2, close: closeModal2 }] =
        useDisclosure(false);

    //graphql
    const [removeAvatar, { error }] = useMutation(REMOVEAVATAR);

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
                    key={item.field}
                />
                <PrivacyOptions {...item} key={item.field} />
            </>
        )
    );

    const removeAvatarEvent = async () => {
        const token: string = cookie.get("_auth") as string;

        const { data: dav } = await removeAvatar({
            variables: {
                token: token,
            },
        });

        const data: IMinimumInfo = dav.removeAvatar;

        if (error) console.log(error.message);

        if (!data.status) {
            return toast.error(data.message, toastOptions);
        }

        return toast.success(data.message, toastOptions);
    };

    const changeAv = async (image: File) => {
        setVisible(true);

        const token: string = cookie.get("_auth") as string;
        const data: IAuthResponse = await changeAvatar(image, token);

        setVisible(false);

        if (!data.status) {
            return toast.error(
                "There was an error updating the avatar. Please try again later",
                toastOptions
            );
        }

        return toast.success(data.message, toastOptions);
    };

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
                <Modal
                    opened={openedModal2}
                    onClose={closeModal2}
                    title="Change avatar"
                    classNames={_modalStyle.classes}
                    overlayProps={{
                        blur: 3,
                    }}
                    fullScreen={lessThan800px}
                >
                    <Dropzone
                        onDrop={(images: FileWithPath[]) => {
                            changeAv(images[0]);
                        }}
                        onReject={() => toast.error("Images have to be less than 5mb and only one image at a time", toastOptions)}
                        maxSize={3 * 1024 ** 2}
                        classNames={_dropzonenStyle.classes}
                        maxFiles={1}
                        accept={IMAGE_MIME_TYPE}
                    >
                        <Group position="center">
                            <Dropzone.Accept>
                                <IoCloudUploadOutline
                                    size={rem(50)}
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <BiErrorCircle
                                    size={rem(50)}
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <HiOutlinePhoto
                                    size={rem(50)}
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                />
                            </Dropzone.Idle>
                        </Group>

                        <Text ta="center" fw={700} fz="lg" mt="xl">
                            <Dropzone.Accept>Drop image here</Dropzone.Accept>
                            <Dropzone.Reject>
                                Images less than 5mb
                            </Dropzone.Reject>
                            <Dropzone.Idle>Upload image</Dropzone.Idle>
                        </Text>
                        <Text
                            ta="center"
                            fz="sm"
                            mt="xs"
                            color={dark ? "#9AA1B9" : "#858DA6"}
                        >
                            Drag&apos;n&apos;drop an image here to upload. We
                            can accept only images files that are less than 5mb
                            in size.
                        </Text>
                    </Dropzone>
                </Modal>
                <Menu
                    shadow="md"
                    position="bottom-start"
                    width={150}
                    transitionProps={{
                        transition: "slide-up",
                        duration: 150,
                    }}
                    classNames={MenuStyles.classes}
                    withArrow
                >
                    <Menu.Target>
                        <Indicator
                            position="bottom-start"
                            offset={7}
                            size={25}
                            label={
                                <Text>
                                    <BiPencil />
                                    Edit
                                </Text>
                            }
                            inline
                            radius={"md"}
                            sx={{ cursor: "pointer" }}
                            classNames={_indicatorStyle.classes}
                        >
                            <Image
                                src={avatarUrl}
                                width="120px"
                                alt="Profile image"
                            />
                        </Indicator>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={openModal2}>
                            Upload an avatar
                        </Menu.Item>
                        <Menu.Item onClick={removeAvatarEvent}>
                            Remove avatar
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <Stack align={"center"} spacing={0}>
                    <Text
                        fw={700}
                        fz={"lg"}
                        color={
                            dark ? theme.colors.dark[7] : theme.colors.gray[7]
                        }
                    >
                        {username}
                    </Text>
                    {/*<Menu
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
                    </Menu>*/}
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
                                                {...form.getInputProps(
                                                    "username"
                                                )}
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
                    {/*<Accordion.Item value="Privacy">
                        <Accordion.Control>Privacy</Accordion.Control>
                        <Accordion.Panel>
                            <Stack
                                sx={{ width: "100%", paddingTop: "10px" }}
                                align="flex-start"
                            >
                                {privacyItems}
                            </Stack>
                        </Accordion.Panel>
                                                </Accordion.Item>*/}
                    {/*<Accordion.Item value="Security">
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
                                    </Accordion.Item>*/}
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
