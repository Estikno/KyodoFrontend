import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { AnimationOnScroll } from "react-animation-on-scroll";

//components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

//options, helpers or utils components already made by me
import { toastOptions, specialCharacters } from "../utils/configs";

//images
import home1 from '../assets/home1.png';
import home2 from '../assets/home2.png';
import home3 from '../assets/home3.png';

//mantine
import {
    Center,
    SimpleGrid,
    Button,
    Group,
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
        image: home2,
    },
    {
        title: "Multimedia support",
        text: `Users can easily share photos, videos, and other
    types of multimedia, making it a versatile
    communication tool.`,
        image: home3,
    },
    {
        title: "Group chats",
        text: `The application allows users to create and
    participate in group chats, making it easier to
    collaborate and communicate with teams.`,
        image: home1,
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

    const lessthan1100px = useMediaQuery(`(max-width: 1100px)`);
    const lessthan915px = useMediaQuery(`(max-width: 915px)`);
    const lessthan572px = useMediaQuery(`(max-width: 572px)`);

    const parts = mockData.map((data, index) => (
        <Group
            spacing={300}
            sx={{
                height: "500px",
                backgroundColor:
                    index % 2 === 0
                        ? dark
                            ? theme.colors.dark[2]
                            : theme.colors.gray[2]
                        : dark
                        ? theme.colors.dark[1]
                        : theme.colors.gray[1],
                width: "100%",
            }}
            position="center"
        >
            <AnimationOnScroll
                offset={100}
                animateOnce={true}
                animateIn="animate__fadeInUp"
            >
                {index % 2 === 0 ? (
                    <SimpleGrid
                        cols={2}
                        spacing={
                            lessthan1100px ? (lessthan915px ? 50 : 100) : 300
                        }
                        breakpoints={[
                            { maxWidth: "sm", cols: 1, spacing: "md" },
                        ]}
                    >
                        <Image
                            src={data.image}
                            sx={{
                                minWidth: "200px",
                                maxWidth: "400px",
                                minHeight: "100px",
                            }}
                        />
                        <Stack
                            align={"flex-start"}
                            justify={"center"}
                            sx={{
                                minWidth: "100px",
                                maxWidth: "400px",
                            }}
                        >
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
                            <Text
                                color={dark ? "#9AA1B9" : "#858DA6"}
                                fz={"lg"}
                            >
                                {data.text}
                            </Text>
                        </Stack>
                    </SimpleGrid>
                ) : (
                    <SimpleGrid
                        cols={2}
                        spacing={
                            lessthan1100px ? (lessthan915px ? 50 : 100) : 300
                        }
                        breakpoints={[
                            { maxWidth: "sm", cols: 1, spacing: "md" },
                        ]}
                    >
                        <MediaQuery
                            largerThan={"sm"}
                            styles={{ display: "none" }}
                        >
                            <Image
                                sx={{
                                    minWidth: "200px",
                                    maxWidth: "400px",
                                    minHeight: "100px",
                                }}
                                src={data.image}
                            />
                        </MediaQuery>
                        <Stack
                            align={"flex-start"}
                            justify={"center"}
                            sx={{
                                minWidth: "100px",
                                maxWidth: "400px",
                            }}
                        >
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
                            <Text
                                color={dark ? "#9AA1B9" : "#858DA6"}
                                fz={"lg"}
                            >
                                {data.text}
                            </Text>
                        </Stack>
                        <MediaQuery
                            smallerThan={"sm"}
                            styles={{ display: "none" }}
                        >
                            <Image
                                sx={{
                                    minWidth: "200px",
                                    maxWidth: "400px",
                                    minHeight: "100px",
                                }}
                                src={data.image}
                            />
                        </MediaQuery>
                    </SimpleGrid>
                )}
            </AnimationOnScroll>
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
                    padding: "0px",
                    margin: "0px",
                }}
                spacing={0}
            >
                <Center
                    sx={{
                        backgroundColor: dark
                            ? theme.colors.dark[1]
                            : theme.colors.gray[1],
                        height: "700px",
                        width: "100%",
                    }}
                >
                    {/*image*/}
                    <Stack
                        align="center"
                        spacing={50}
                        sx={{ maxWidth: "1200px", minWidth: "200px" }}
                    >
                        <Stack align={"center"} justify={"center"}>
                            <Title
                                order={1}
                                fz={lessthan572px ? 40 : 60}
                                fw={700}
                                ta={"center"}
                                color={
                                    dark
                                        ? theme.colors.dark[7]
                                        : theme.colors.gray[7]
                                }
                            >
                                Imagine a chat app..
                            </Title>
                            <Text
                                fz={lessthan572px ? 18 : 22}
                                sx={{ maxWidth: "960px", minWidth: "200px" }}
                                ta="center"
                                color={dark ? "#9AA1B9" : "#858DA6"}
                            >
                                ... with a cutting-edge real-time communication
                                platform designed to meet the needs of modern
                                users. That allows for fast and secure
                                messaging, file sharing, and multimedia
                                exchange.
                            </Text>
                        </Stack>
                        <Group position="center" grow sx={{ width: "100%" }}>
                            <Button
                                sx={{
                                    borderColor:
                                        theme.colorScheme === "dark"
                                            ? theme.colors.dark[2]
                                            : theme.colors.gray[2],
                                    backgroundColor:
                                        theme.colorScheme === "dark"
                                            ? theme.colors.dark[0]
                                            : theme.colors.gray[0],

                                    ...theme.fn.hover({
                                        backgroundColor:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.dark[1]
                                                : theme.colors.gray[1],
                                    }),
                                }}
                                variant="default"
                            >
                                <Text fz={"lg"}>Log in</Text>
                            </Button>
                            <Button>
                                <Text fz={"lg"}>Sign up</Text>
                            </Button>
                        </Group>
                    </Stack>
                </Center>
                {parts}
                <Footer
                    data={[
                        {
                            title: "About",
                            links: [
                                { label: "Features", link: "" },
                                { label: "Pricing", link: "" },
                                { label: "Support", link: "" },
                                { label: "Forums", link: "" },
                            ],
                        },
                        {
                            title: "Project",
                            links: [
                                { label: "Contribute", link: "" },
                                { label: "Media Assets", link: "" },
                                { label: "Changelog", link: "" },
                                { label: "Releases", link: "" },
                            ],
                        },
                        {
                            title: "Community",
                            links: [
                                { label: "Join Discord", link: "" },
                                { label: "Follow on twitter", link: "" },
                                { label: "Email Newsletter", link: "" },
                                { label: "Github Discussion", link: "" },
                            ],
                        },
                    ]}
                />
            </Stack>
            <ToastContainer />
        </>
    );
}

export default Home;
