import React, {useEffect} from "react";

//mantine
import {
    Group,
    Stack,
    useMantineTheme,
    ScrollArea,
    TextInput,
    Title,
    UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

function RightSide({
    children,
    sendMessage,
    setActualMessage,
    actualMessage,
    viewport,
    dummy
}: {
    children: JSX.Element | JSX.Element[];
    sendMessage: (event: React.FormEvent<Element>) => void;
    setActualMessage: React.Dispatch<React.SetStateAction<string>>;
    actualMessage: string;
    viewport: React.RefObject<HTMLDivElement>,
    dummy: React.RefObject<HTMLSpanElement>
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
            <ScrollArea
                type="scroll"
                sx={(theme) => ({
                    width: "100%",
                    height: lessThan500px ? "80vh" : "77vh",
                    backgroundColor: theme.colors.dark[6],
                })}
                style={{ padding: "5px" }}
                viewportRef={viewport}
            >
                <Stack sx={(theme) => ({
                    width: "100%",
                    height: "100%"
                })}>
                    {children}
                    <span ref={dummy} style={{color: theme.colors.dark[6]}}>s</span>
                </Stack>
            </ScrollArea>
            <Group
                position="apart"
                spacing="xs"
                sx={{
                    height: "8vh",
                    width: "100%",
                    padding: "0 1rem",
                    backgroundColor: theme.colors.dark[3],
                }}
            >

                <form
                    onSubmit={(e: React.FormEvent<Element>) => 
                        sendMessage(e)
                    }

                    style={{
                        width: "100%",
                        height: "100%",
                    }}

                >
                    <Group position="apart" sx={{
                        height: "100%",
                        width: "100%"
                    }}>
                        <TextInput
                            placeholder="Message"
                            style={{
                                width: lesstThan768px
                                    ? lessThan457px
                                        ? "65%"
                                        : "78%"
                                    : lessthan1500px
                                    ? "83%"
                                    : "93%",
                            }}
                            onChange={(event) =>
                                setActualMessage(event.currentTarget.value)
                            }
                            value={actualMessage}
                        />
                        <Title order={2}>
                            <FaPaperclip />
                        </Title>

                        <UnstyledButton type="submit">
                            <Title order={2}>
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
