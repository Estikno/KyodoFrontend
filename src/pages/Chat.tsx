import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import cookie from "js-cookie";

import Navbar from "../components/navbar/Navbar";
import Friend from "../components/chat/Friend";
import Message from "../components/chat/Message";
import Bar from "../components/chat/Bar";
import MobileFriendContainer from "../components/chat/MobileFriendsContainer";
import LeftSide from "../components/chat/LeftSide";
import RightSide from "../components/chat/RightSide";

//options, helpers or utils already made by me
import { toastOptions } from "../utils/configs";
import { getAllUsers, getUserInfo } from "../utils/callApi";
import * as apiRoutes from "../utils/apiRoutes";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IUserInfo } from "../interfaces/IApiResponses";
import IMessage from "../interfaces/IMessage";

const useStyles = createStyles((theme) => ({
    burger: {
        [theme.fn.largerThan("md")]: {
            display: "none",
        },
    },

    friends: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },
}));

const socket: Socket = io("http://localhost:4758");
const timeBtwMessages: number = 2500; //in milliseconds

function Chat() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //auth's funtions
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    const theme = useMantineTheme();
    const { classes } = useStyles();

    const lessThan500px = useMediaQuery(`(max-width: 500px)`);

    const viewport = useRef<HTMLDivElement>(null);
    const dummy = useRef<HTMLSpanElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [friends, setFriends] = useState<IUserInfo[]>([]);
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        verified: true,
        avatarUrl: "",
        username: "",
        email: "",
    });
    const [actualMessage, setActualMessage] = useState<string>("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [lastMessageDate, setLastMessageDate] = useState<Date>();

    const [visible, setVisible] = useState<boolean>(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        if (userInfo) {
            socket.on("all-msg", (message: string[]) => {
                const finalArray: IMessage[] = message.map((msg) => {
                    console.log(msg);
                    if (msg.startsWith(userInfo.username)) {
                        return { message: msg, fromSelf: true };
                    } else {
                        return { message: msg, fromSelf: false };
                    }
                });

                setMessages(finalArray);

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "auto",
                });
            });

            socket.on("msg", (message) => {
                setMessages([
                    ...messages,
                    {
                        message: message.message,
                        fromSelf:
                            message.username === userInfo.username
                                ? true
                                : false,
                    },
                ]);

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "smooth",
                });

                dummy.current?.scrollIntoView({ behavior: "smooth" });
            });

            socket.on("new-usr", (newFriend: IUserInfo) => {
                setFriends([...friends, newFriend]);
            });
        }
    }, [userInfo, messages]);

    useEffect(() => {
        if (!isAuthenticated()) {
            signOut();
            navigate("/register");
        }

        //confirms if the token is valid, if not it will delete it, however if is valid it will redirect the user to the profile page
        const _token: string = cookie.get("_auth") as string;

        const getInfo = async (token: string) => {
            const usersData = await getAllUsers(token);

            if (!usersData.status)
                return toast.error(
                    "An error occurred while getting users",
                    toastOptions
                );
            if (!Array.isArray(usersData.user))
                return toast.error("User has to be an array", toastOptions);

            setFriends(usersData.user);

            const userData = await getUserInfo(token);

            if (!userData.status)
                return toast.error("User info is not available", toastOptions);
            if (!userData.user)
                return toast.error("No avatar provided", toastOptions);
            if (Array.isArray(userData.user))
                return toast.error("User mustn't be an array", toastOptions);

            setUserInfo(userData.user);

            socket.emit("add-user", userData.user.username);

            setVisible(false);
        };

        if (_token) {
            //navigate("/profile");
            getInfo(_token);
        } else {
            signOut();
            navigate("/login");
        }
    }, []);

    const sendMessage = (event: React.FormEvent<Element>) => {
        event.preventDefault();

        if (lastMessageDate) {
            const d1 = new Date();
            const subtractDate: number = Math.abs(
                d1.getTime() - lastMessageDate.getTime()
            );

            //console.log((subtractDate > 5000) ? "can send" : "can not send");

            if (subtractDate < timeBtwMessages)
                return toast.error(
                    "Can't send message so quickly. Please wait a bit.",
                    toastOptions
                );
        }

        setLastMessageDate(new Date());

        if (actualMessage === "") {
            return toast.error(
                "Write something to send a message",
                toastOptions
            );
        }

        if (socket && userInfo) {
            const finalMessage = userInfo.username + ": " + actualMessage;
            /*const newMessage: IMessage = {
                message: finalMessage,
                fromSelf: true,
            };*/
            //setMessages([...messages, newMessage]);
            socket.emit("send-msg", {
                message: finalMessage,
                person: userInfo.username,
            });
        }

        setActualMessage("");
    };

    return (
        <>
            <Navbar />

            <LoadingOverlay visible={visible} overlayBlur={8} />
            {userInfo?.verified ? (
                <>
                    <Bar open={open} setOpen={setOpen} />

                    <MobileFriendContainer open={open} setOpen={setOpen}>
                        {friends.map((friend) => (
                            <Friend
                                name={friend.username}
                                key={friend.username}
                                avatarUrl={friend.avatarUrl}
                            />
                        ))}
                    </MobileFriendContainer>

                    <Center sx={{ height: lessThan500px ? "88vh" : "85vh" }}>
                        <Grid
                            grow
                            style={{ width: "100%", height: "100%" }}
                            columns={12}
                        >
                            <Grid.Col
                                span={3}
                                sx={() => ({
                                    backgroundColor: theme.colors.dark[4],
                                    padding: "0",
                                })}
                                className={classes.friends}
                            >
                                <LeftSide
                                    avatarUrl={userInfo?.avatarUrl}
                                    username={userInfo?.username}
                                >
                                    {friends.map((friend) => (
                                        <Friend
                                            name={friend.username}
                                            key={friend.username}
                                            avatarUrl={friend.avatarUrl}
                                        />
                                    ))}
                                </LeftSide>
                            </Grid.Col>
                            <Grid.Col span={9} sx={{ padding: "0" }}>
                                <RightSide
                                    sendMessage={sendMessage}
                                    actualMessage={actualMessage}
                                    setActualMessage={setActualMessage}
                                    viewport={viewport}
                                    dummy={dummy}
                                >
                                    {messages.map((message) => (
                                        <Message
                                            key={`${message.message}/${
                                                ((Math.random() *
                                                    Math.random()) ^
                                                    2) *
                                                Math.random()
                                            }`}
                                            message={message.message}
                                            position={
                                                message.fromSelf ? "r" : "l"
                                            }
                                        />
                                    ))}
                                </RightSide>
                            </Grid.Col>
                        </Grid>
                    </Center>
                </>
            ) : (
                <>
                    <Center style={{ width: "100%", height: "90vh" }}>
                        <Card
                            shadow="sm"
                            p={"lg"}
                            radius="md"
                            withBorder
                            sx={{ width: "30%" }}
                        >
                            <Stack
                                align={"center"}
                                justify="center"
                                spacing={"md"}
                            >
                                <Title order={2} ta="center">
                                    Sorry, but it seems that your email address
                                    has not been verified yet. Please check your
                                    email address to verify your email.
                                </Title>
                                <Image
                                    src="https://res.cloudinary.com/kyodo/image/upload/v1672939191/kyodo/icons/cross_wf1uzx.png"
                                    alt="tick"
                                    height={200}
                                    width={200}
                                />
                                <Text fz={"xl"} ta="center">
                                    Please verify your email to access the chat.
                                </Text>
                            </Stack>
                        </Card>
                    </Center>
                </>
            )}
            <ToastContainer />
        </>
    );
}

export default Chat;
