import React, { useEffect } from "react";

//mantine
import {
    Group,
    Stack,
    useMantineTheme,
    ScrollArea,
    TextInput,
    Title,
    UnstyledButton,
    Avatar,
    Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsImage, BsFillEmojiSmileFill } from "react-icons/bs";

function RightSide({
    children,
    sendMessage,
    setActualMessage,
    actualMessage,
    viewport,
    dummy,
}: {
    children: JSX.Element | JSX.Element[];
    sendMessage: (event: React.FormEvent<Element>) => void;
    setActualMessage: React.Dispatch<React.SetStateAction<string>>;
    actualMessage: string;
    viewport: React.RefObject<HTMLDivElement>;
    dummy: React.RefObject<HTMLSpanElement>;
}) {
    const theme = useMantineTheme();

    const lesstThan768px = useMediaQuery("(max-width: 768px)");
    const lessThan500px = useMediaQuery(`(max-width: 500px)`);
    const lessThan457px = useMediaQuery(`(max-width: 457px)`);
    const lessthan1500px = useMediaQuery(`(max-width: 1500px)`);

    return (
        <Stack
            align="center"
            spacing={0}
            justify="flex-start"
            sx={{ height: "100%" }}
        >
            <Group
                sx={{
                    width: "100%",
                    height: "12vh",
                    borderBottom: ".1rem solid",
                    borderColor: "#36404A",
                }}
                position="apart"
            >
                <Group spacing={"xs"} sx={{ marginLeft: "20px" }}>
                    <Avatar radius="xl" size="md" color="blue" />
                    <Text fz={"lg"} fw={700}>
                        Patricio Estrella
                        <GoPrimitiveDot
                            style={{ paddingTop: "5px", color: "green" }}
                        />
                    </Text>
                </Group>
                <Group sx={{ marginRight: "20px" }} spacing={"xl"}>
                    <Title order={3}>
                        <HiOutlineMagnifyingGlass />
                    </Title>
                    <Title order={3}>
                        <IoCallOutline />
                    </Title>
                    <Title order={3}>
                        <AiOutlineVideoCamera />
                    </Title>
                    <Title order={3}>
                        <MdPersonOutline />
                    </Title>
                    <Title order={3}>
                        <BiDotsHorizontalRounded />
                    </Title>
                </Group>
            </Group>
            <ScrollArea
                type="scroll"
                sx={(theme) => ({
                    width: "100%",
                    height: "100%",
                })}
                style={{ padding: "5px" }}
                viewportRef={viewport}
            >
                <Stack
                    sx={(theme) => ({
                        width: "100%",
                        height: "100%",
                    })}
                >
                    {children}
                    <span ref={dummy} style={{ color: "#262E35" }}>
                        s
                    </span>
                </Stack>
            </ScrollArea>
            <Group
                position="apart"
                spacing="xs"
                sx={{
                    height: "12vh",
                    width: "100%",
                    padding: "0 1rem",
                    borderTop: ".1rem solid",
                    borderColor: "#36404A",
                }}
            >
                <form
                    onSubmit={(e: React.FormEvent<Element>) => sendMessage(e)}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Group
                        position="apart"
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <TextInput
                            placeholder="Enter Message..."
                            sx={(theme) => ({
                                width: lesstThan768px
                                    ? lessThan457px
                                        ? "65%"
                                        : "78%"
                                    : lessthan1500px
                                    ? "83%"
                                    : "85%",
                                input: {
                                    "::placeholder": {
                                        color: "#9BB0C7",
                                    },
                                    paddingLeft: "15px",
                                    paddingRight: "15px",
                                },
                                backgroundColor: "#36404A",
                                borderRadius: theme.radius.md,
                            })}
                            onChange={(event) =>
                                setActualMessage(event.currentTarget.value)
                            }
                            value={actualMessage}
                            size="md"
                            variant="unstyled"
                        />
                        <Title order={4}>
                            <BsFillEmojiSmileFill />
                        </Title>
                        <Title order={4}>
                            <FaPaperclip />
                        </Title>
                        <Title order={4}>
                            <BsImage />
                        </Title>

                        <UnstyledButton type="submit">
                            <Title order={3}>
                                <FaPaperPlane />
                            </Title>
                        </UnstyledButton>
                    </Group>
                </form>
            </Group>
        </Stack>
    );
}

export default RightSide;
