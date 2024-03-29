import React, { useEffect } from "react";

//redux
import { setSelectedFriend } from "../../features/chat/selectedFriendSlice";
import { useAppDispatch } from "../../app/hooks";

//interfaces
import { IUserInfo } from "../../interfaces/IApiResponses";

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
    useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCallOutline, IoCaretBackOutline } from "react-icons/io5";
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
    setShowChatSmall,
    friend,
}: {
    children: JSX.Element | JSX.Element[];
    sendMessage: (event: React.FormEvent<Element>) => void;
    setActualMessage: React.Dispatch<React.SetStateAction<string>>;
    actualMessage: string;
    viewport: React.RefObject<HTMLDivElement>;
    dummy: React.RefObject<HTMLSpanElement>;
    setShowChatSmall: React.Dispatch<React.SetStateAction<boolean>>;
    friend: IUserInfo | undefined;
}) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const lesstThan1200px = useMediaQuery("(max-width: 1200px)");
    const lessthan1600px = useMediaQuery(`(max-width: 1600px)`);
    const lessthan991px = useMediaQuery(`(max-width: 991px)`);
    const lessthan400px = useMediaQuery(`(max-width: 400px)`);

    const dispatch = useAppDispatch();

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
                    borderBottom: dark ? ".1rem solid" : ".12rem solid",
                    borderColor: dark
                        ? theme.colors.dark[0]
                        : theme.colors.gray[1],
                }}
                position="apart"
            >
                <Group spacing={"xs"} sx={{ marginLeft: "20px" }}>
                    {lessthan991px ? (
                        <Title
                            order={3}
                            color={dark ? "#9FB4D2" : "#858DA6"}
                            onClick={() => {
                                setShowChatSmall(false);
                                dispatch(setSelectedFriend(-1));
                            }}
                        >
                            <IoCaretBackOutline />
                        </Title>
                    ) : (
                        <></>
                    )}
                    <Avatar radius="xl" size="md" color="blue" />
                    <Text
                        fz={"lg"}
                        fw={700}
                        color={
                            dark ? theme.colors.dark[7] : theme.colors.gray[7]
                        }
                    >
                        {friend ? friend.username : ""}
                        <GoPrimitiveDot
                            style={{ paddingTop: "5px", color: "green" }}
                        />
                    </Text>
                </Group>
                <Group
                    sx={{
                        marginRight: "20px",
                        color: dark ? "#9FB4D2" : "#858DA6",
                    }}
                    spacing={"xl"}
                >
                    {/*<Title order={3}>
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
                    </Title>*/}
                </Group>
            </Group>
            <ScrollArea
                type="scroll"
                sx={(theme) => ({
                    width: "100%",
                    height: lessthan991px ? "100%" : "76vh",
                    padding: "5px"
                })}
                viewportRef={viewport}
            >
                <Stack
                    sx={(theme) => ({
                        width: "100%",
                        height: "100%",
                    })}
                    spacing="xl"
                >
                    {children}
                    <span
                        ref={dummy}
                        style={{
                            color: dark
                                ? theme.colors.dark[2]
                                : theme.colors.gray[2],
                        }}
                    >
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
                    borderTop: dark ? ".1rem solid" : ".12rem solid",
                    borderColor: dark
                        ? theme.colors.dark[0]
                        : theme.colors.gray[1],
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
                                width: lessthan400px
                                    ? "85%"
                                    : lessthan991px
                                    ? "89%"
                                    : lesstThan1200px
                                    ? "90%"
                                    : lessthan1600px
                                    ? "94.5%"
                                    : "95%",
                                input: {
                                    color: dark ? "#9BB0C7" : "#7A7FA6",
                                    "::placeholder": {
                                        color: dark ? "#9BB0C7" : "#7A7FA6",
                                    },
                                    paddingLeft: "15px",
                                    paddingRight: "35px",
                                },
                                backgroundColor: dark
                                    ? theme.colors.dark[0]
                                    : "#E6EBF5",
                                borderRadius: theme.radius.md,
                            })}
                            onChange={(event) =>
                                setActualMessage(event.currentTarget.value)
                            }
                            value={actualMessage}
                            size="md"
                            variant="unstyled"
                            rightSection={
                                <Title
                                    order={4}
                                    color={
                                        dark
                                            ? theme.colors.dark[4]
                                            : theme.colors.gray[4]
                                    }
                                >
                                    <FaPaperclip />
                                </Title>
                            }
                            icon={
                                <Title
                                    order={4}
                                    color={
                                        dark
                                            ? theme.colors.dark[4]
                                            : theme.colors.gray[4]
                                    }
                                >
                                    <BsFillEmojiSmileFill />
                                </Title>
                            }
                        />
                        {/*<Title
                            order={4}
                            color={
                                dark
                                    ? theme.colors.dark[4]
                                    : theme.colors.gray[4]
                            }
                        >
                            <FaPaperclip />
                        </Title>
                        <Title
                            order={4}
                            color={
                                dark
                                    ? theme.colors.dark[4]
                                    : theme.colors.gray[4]
                            }
                        >
                            <BsImage />
                        </Title>*/}

                        <UnstyledButton type="submit">
                            <Title
                                order={3}
                                color={
                                    dark
                                        ? theme.colors.dark[4]
                                        : theme.colors.gray[4]
                                }
                            >
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
