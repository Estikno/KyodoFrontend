import React from "react";

//images
import _tick from '../assets/tick.png';
import cross from '../assets/cross.png';

//mantine
import {
    Grid,
    Center,
    useMantineTheme,
    createStyles,
    Card,
    Image,
    Text,
    Title,
    Stack,
    LoadingOverlay,
    useMantineColorScheme,
} from "@mantine/core";

function ScreenMessage({
    message,
    text,
    tick,
}: {
    message: string;
    text: string;
    tick: boolean;
}) {
    //mantine
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Center
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: dark
                    ? theme.colors.dark[0]
                    : theme.colors.gray[0],
            }}
        >
            <Card
                shadow="sm"
                p={"lg"}
                radius="md"
                sx={{
                    width: "30%",
                    backgroundColor: dark
                        ? theme.colors.dark[1]
                        : theme.colors.gray[1],
                    borderColor: dark
                        ? theme.colors.dark[5]
                        : theme.colors.gray[5],
                }}
            >
                <Stack align={"center"} justify="center" spacing={"md"}>
                    <Title
                        order={2}
                        ta="center"
                        color={
                            dark ? theme.colors.dark[7] : theme.colors.gray[7]
                        }
                    >
                        {message}
                    </Title>
                    <Image
                        src={
                            tick
                                ? _tick
                                : cross
                        }
                        alt="cross"
                        height={200}
                        width={200}
                    />
                    <Text
                        fz={"xl"}
                        ta="center"
                        color={
                            dark ? theme.colors.dark[7] : theme.colors.gray[7]
                        }
                    >
                        {text}
                    </Text>
                </Stack>
            </Card>
        </Center>
    );
}

export default ScreenMessage;
