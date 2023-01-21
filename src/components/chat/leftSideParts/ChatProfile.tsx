import React, { useState } from "react";

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
} from "@mantine/core";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAttachmentLine } from "react-icons/ri";

function ChatProfile() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

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
            <Group position="apart" sx={{ width: "100%" }}>
                <Title
                    order={3}
                    color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
                >
                    My Profile
                </Title>
                <Title
                    order={3}
                    color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
                >
                    <BiDotsVerticalRounded />
                </Title>
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
                        Patricio estrella
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
            <Accordion
                variant="separated"
                defaultValue="About"
                sx={{ width: "100%" }}
            >
                <Accordion.Item value="About">
                    <Accordion.Control icon={<BsFillPersonFill />}>About</Accordion.Control>
                    <Accordion.Panel>
                        Colors, fonts, shadows and many other parts are
                        customizable to fit your design needs
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Attached Files">
                    <Accordion.Control icon={<RiAttachmentLine />}>Attached Files</Accordion.Control>
                    <Accordion.Panel>
                        Colors, fonts, shadows and many other parts are
                        customizable to fit your design needs
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );
}

export default ChatProfile;
