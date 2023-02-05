import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//components
import Navbar from "../components/navbar/Navbar";

//options, helpers or utils components already made by me
import { toastOptions, specialCharacters } from "../utils/configs";

//mantine
import {
    Center,
    SimpleGrid,
    TextInput,
    Button,
    Group,
    Space,
    PasswordInput,
    Text,
    Box,
    MediaQuery,
    LoadingOverlay,
    Stack,
    useMantineColorScheme,
    useMantineTheme,
    Title,
    Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const mockData = [
    {
        title: "Secure communication",
        text: `The application uses end-to-end encryption to ensure
    the confidentiality of messages and files shared
    within the chat.`,
        image: "https://placeholder.pics/svg/400x300/FF0000-85C8FF/DCFF52-4DFFF1/Placeholder",
    },
    {
        title: "Multimedia support",
        text: `Users can easily share photos, videos, and other
    types of multimedia, making it a versatile
    communication tool.`,
        image: "https://placeholder.pics/svg/400x300/FF0000-85C8FF/DCFF52-4DFFF1/Placeholder",
    },
    {
        title: "Group chats",
        text: `The application allows users to create and
    participate in group chats, making it easier to
    collaborate and communicate with teams.`,
        image: "https://placeholder.pics/svg/400x300/FF0000-85C8FF/DCFF52-4DFFF1/Placeholder",
    },
    {
        title: "User-friendly interface",
        text: `The application features a clean and intuitive
    interface, making it easy to use for people of all
    ages.`,
        image: "https://placeholder.pics/svg/400x300/FF0000-85C8FF/DCFF52-4DFFF1/Placeholder",
    },
];

function Home() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const parts = mockData.map((data, index) => (
        <Group spacing={300}>
            {index % 2 === 0 ? (
                <>
                    <Image height={300} width={400} src={data.image} />
                    <Stack align={"flex-start"} sx={{ width: "400px" }}>
                        <Title
                            order={1}
                            color={
                                dark
                                    ? theme.colors.dark[7]
                                    : theme.colors.gray[7]
                            }
                        >
                            {data.title}
                        </Title>
                        <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                            {data.text}
                        </Text>
                    </Stack>
                </>
            ) : (
                <>
                    <Stack align={"flex-start"} sx={{ width: "400px" }}>
                        <Title
                            order={1}
                            color={
                                dark
                                    ? theme.colors.dark[7]
                                    : theme.colors.gray[7]
                            }
                        >
                            {data.title}
                        </Title>
                        <Text color={dark ? "#9AA1B9" : "#858DA6"}>
                            {data.text}
                        </Text>
                    </Stack>
                    <Image height={300} width={400} src={data.image} />
                </>
            )}
        </Group>
    ));

    return (
        <>
            <Navbar />
            <Stack
                align={"center"}
                sx={{
                    width: "100%",
                    backgroundColor: dark
                        ? theme.colors.dark[2]
                        : theme.colors.gray[1],
                }}
            >
                <Group>
                    {/*image*/}
                    <Stack>
                        <Title order={1}>Imagine a chat app..</Title>
                        <Text>
                            with a cutting-edge real-time communication platform
                            designed to meet the needs of modern users. That
                            allows for fast and secure messaging, file sharing,
                            and multimedia exchange.
                        </Text>
                    </Stack>
                </Group>
                {parts}
            </Stack>
            <ToastContainer />
        </>
    );
}

export default Home;
