import React from "react";

import {
    Stack,
    Image,
    Title,
    Avatar,
    UnstyledButton,
    Tooltip,
} from "@mantine/core";

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
                <Tooltip label="Profile">
                    <UnstyledButton>
                        <Title order={2}>
                            <MdPersonOutline />
                        </Title>
                    </UnstyledButton>
                </Tooltip>

                <Tooltip label="Chats">
                    <UnstyledButton>
                        <Title order={2}>
                            <HiOutlineChatBubbleOvalLeftEllipsis />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip label="Groups">
                    <UnstyledButton>
                        <Title order={2}>
                            <RiGroupLine />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip label="Contacts">
                    <UnstyledButton>
                        <Title order={2}>
                            <RiContactsLine />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
                <Tooltip label="Settings">
                    <UnstyledButton>
                        <Title order={2}>
                            <RiSettings2Line />
                        </Title>
                    </UnstyledButton>
                </Tooltip>
            </Stack>
            <Stack align="center" justify="space-between" spacing={"lg"}>
                <UnstyledButton>
                    <Title order={2}>
                        <MdLanguage />
                    </Title>
                </UnstyledButton>
                <UnstyledButton>
                    <Title order={2}>
                        <BiSun />
                    </Title>
                </UnstyledButton>
                <UnstyledButton>
                    <Avatar radius="xl" size="md" color="blue" />
                </UnstyledButton>
            </Stack>
        </Stack>
    );
}

export default ChatNavbar;
