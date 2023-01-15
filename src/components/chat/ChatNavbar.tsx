import React from "react";

import { Stack, Image, Title, Avatar } from "@mantine/core";

import { MdPersonOutline, MdLanguage } from "react-icons/md";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiSettings2Line, RiGroupLine, RiContactsLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";

function ChatNavbar() {
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
                    "https://res.cloudinary.com/kyodo/image/upload/v1673725174/kyodo/icons/iconoPrueba_thdbya.png"
                }
                width={50}
                height={50}
            />
            <Stack align="center" justify="space-between" spacing={"lg"}>
                <Title order={2}>
                    <MdPersonOutline />
                </Title>
                <Title order={2}>
                    <HiOutlineChatBubbleOvalLeftEllipsis />
                </Title>
                <Title order={2}>
                    <RiGroupLine />
                </Title>
                <Title order={2}>
                    <RiContactsLine />
                </Title>
                <Title order={2}>
                    <RiSettings2Line />
                </Title>
            </Stack>
            <Stack align="center" justify="space-between" spacing={"lg"}>
                <Title order={2}>
                    <MdLanguage />
                </Title>
                <Title order={2}>
                    <BiSun />
                </Title>
                <Avatar radius="xl" size="md" color="blue" />
            </Stack>
        </Stack>
    );
}

export default ChatNavbar;
