import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import {v4 as uuid} from 'uuid';

//components
import AccordionField from './AccordionField';

//mantine
import {
    useMantineTheme,
    Image,
    Text,
    Title,
    Stack,
    useMantineColorScheme,
    Group,
    Divider,
    Accordion,
    createStyles,
    Menu,
    UnstyledButton,
    ScrollArea,
} from "@mantine/core";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAttachmentLine } from "react-icons/ri";

//styles
import menuStyle from "../../../utils/MantineStyles/MenuStyles";
import accordionStyles from "../../../utils/MantineStyles/AccordionStyle";

function ChatProfile() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const AccordionStyles = accordionStyles();
    const MenuStyles = menuStyle();

    const userInfo = useAppSelector((state) => state.auth);

    const fieldData = [
        {
            field: "Name",
            content: userInfo.username,
        },
        {
            field: "Email",
            content: userInfo.email,
        },
        {
            field: "Location",
            content: "Florida",
        },
    ];

    const items = fieldData.map((item) => (
        <AccordionField {...item} key={uuid()} />
    ));

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
            <Group position="apart" sx={{ width: "100%" }}>
                <Title
                    order={3}
                    color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
                >
                    My Profile
                </Title>
                <Menu
                    shadow={"md"}
                    position="bottom-end"
                    classNames={MenuStyles.classes}
                    width={150}
                    transitionProps={{ transition: 'slide-up', duration: 150 }}
                >
                    <Menu.Target>
                        <UnstyledButton>
                            <Title
                                order={3}
                                color={
                                    dark
                                        ? theme.colors.dark[7]
                                        : theme.colors.gray[7]
                                }
                            >
                                <BiDotsVerticalRounded />
                            </Title>
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>Edit</Menu.Item>
                        <Menu.Item>Action</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>Other</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
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
                        {userInfo.username}
                    </Text>
                    <Text fz={"lg"} color={dark ? "#9AA1B9" : "#858DA6"}>
                        <GoPrimitiveDot
                            style={{ paddingTop: "5px", color: "green" }}
                        />
                        Active
                    </Text>
                </Stack>
            </Stack>
            <Divider
                size={"xs"}
                sx={{ width: "100%" }}
                color={dark ? theme.colors.dark[0] : theme.colors.gray[0]}
            />
            <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                If several languages coalesce, the grammar of the resulting
                language is more simple and regular than that of the individual.
            </Text>
            <ScrollArea sx={{ height: "100%", width: "100%" }} type="scroll">
                <Accordion
                    variant="separated"
                    defaultValue="About"
                    sx={{ width: "100%" }}
                    classNames={AccordionStyles.classes}
                    transitionDuration={250}
                >
                    <Accordion.Item value="About">
                        <Accordion.Control icon={<BsFillPersonFill />}>
                            About
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack sx={{ width: "100%" }} align="flex-start">
                                {items}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="Attached Files">
                        <Accordion.Control icon={<RiAttachmentLine />}>
                            Attached Files
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                                Colors, fonts, shadows and many other parts are
                                customizable to fit your design needs
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </ScrollArea>
        </Stack>
    );
}

export default ChatProfile;
