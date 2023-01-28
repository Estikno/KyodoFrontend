import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import cookie from "js-cookie";
import Filter from "bad-words";

import Navbar from "../components/navbar/Navbar";
import Friend from "../components/chat/Friend";
import Message from "../components/chat/Message";
import Bar from "../components/chat/Bar";
import MobileFriendContainer from "../components/chat/MobileFriendsContainer";
import RightSide from "../components/chat/RightSide";
import ChatNavbar from "../components/chat/ChatNavbar";

//navbar options
import Chats from "../components/chat/leftSideParts/Chats";
import ChatProfile from "../components/chat/leftSideParts/ChatProfile";
import ChatSettings from "../components/chat/leftSideParts/ChatSettings";

import ScreenMessage from "../components/ScreenMessage";

//css
//import "../css/chat.css"

//options, helpers or utils already made by me
import { toastOptions, apiRoute } from "../utils/configs";
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
    useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IUserInfo } from "../interfaces/IApiResponses";
import IMessage, { IRecieveMessage } from "../interfaces/IMessage";

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

const socket: Socket = io(apiRoute);
const timeBtwMessages: number = 2500; //in milliseconds

function Chat() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //filter
    const filter = new Filter();

    //auth's funtions
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    //mantine
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

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
    const [selectedWindow, setSelectedWindow] = useState<number>(1);

    const [visible, setVisible] = useState<boolean>(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        if (userInfo) {
            socket.on("all-msg", (message: IRecieveMessage[]) => {
                const finalArray: IMessage[] = message.map((msg) => {
                    if (msg.username === userInfo.username) {
                        return {
                            message: msg.message,
                            fromSelf: true,
                            username: msg.username,
                        };
                    } else {
                        return {
                            message: msg.message,
                            fromSelf: false,
                            username: msg.username,
                        };
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
                        message: filter.clean(message.message),
                        fromSelf:
                            message.username === userInfo.username
                                ? true
                                : false,
                        username: userInfo.username,
                    },
                ]);

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "auto",
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
                    "There was an error getting the users information",
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

        if (actualMessage.length > 250) {
            return toast.error(
                "You can't send more than 250 characters",
                toastOptions
            );
        }

        if (socket && userInfo) {
            /*const newMessage: IMessage = {
                message: finalMessage,
                fromSelf: true,
            };*/
            //setMessages([...messages, newMessage]);
            socket.emit("send-msg", {
                message: actualMessage,
                person: userInfo.username,
            });
        }

        setActualMessage("");
    };

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={8} />
            {userInfo?.verified ? (
                <>
                    <MobileFriendContainer open={open} setOpen={setOpen}>
                        {friends.map((friend) => (
                            <Friend
                                name={friend.username}
                                key={friend.username}
                                avatarUrl={friend.avatarUrl}
                            />
                        ))}
                    </MobileFriendContainer>

                    <Center sx={{ height: "100vh", width: "100vw" }}>
                        <Grid
                            sx={{ width: "100%", height: "100vh", padding: 0 }}
                            columns={24}
                        >
                            <Grid.Col
                                span={1}
                                sx={{
                                    backgroundColor: dark
                                        ? theme.colors.dark[0]
                                        : theme.colors.gray[0],
                                    minWidth: "80px",
                                    height: "100%",
                                }}
                            >
                                <ChatNavbar
                                    setSelectedWindow={setSelectedWindow}
                                    selectedWindow={selectedWindow}
                                />
                            </Grid.Col>
                            <Grid.Col
                                span={5}
                                sx={() => ({
                                    backgroundColor: dark
                                        ? theme.colors.dark[1]
                                        : theme.colors.gray[1],
                                    padding: "0",
                                    minWidth: "391px",
                                    height: "100%",
                                })}
                                className={classes.friends}
                            >
                                {selectedWindow === 0 ? (
                                    <ChatProfile />
                                ) : selectedWindow === 1 ? (
                                    <Chats
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
                                    </Chats>
                                ) : selectedWindow === 2 ? (
                                    <ChatSettings />
                                ) : (
                                    <></>
                                )}
                            </Grid.Col>
                            <Grid.Col
                                span={"auto"}
                                sx={{
                                    padding: "0",
                                    backgroundColor: dark
                                        ? theme.colors.dark[2]
                                        : theme.colors.gray[2],
                                    height: "100%",
                                }}
                            >
                                <RightSide
                                    sendMessage={sendMessage}
                                    actualMessage={actualMessage}
                                    setActualMessage={setActualMessage}
                                    viewport={viewport}
                                    dummy={dummy}
                                >
                                    {messages.map((message, index) => (
                                        <Message
                                            key={`${message.message}/${
                                                message.username
                                            }/${
                                                Math.random() *
                                                Math.random() *
                                                Math.random()
                                            }`}
                                            message={message.message}
                                            position={
                                                message.fromSelf ? "r" : "l"
                                            }
                                            displayAvatar={
                                                messages[index + 1]
                                                    ? messages[index + 1]
                                                          .username ===
                                                      message.username
                                                        ? false
                                                        : true
                                                    : true
                                            }
                                        />
                                    ))}
                                </RightSide>
                            </Grid.Col>
                        </Grid>
                    </Center>
                </>
            ) : (
                <ScreenMessage
                    message="Sorry, but it seems that your email address has not been
                verified yet. Please check your email address to verify
                your email."
                    text="Please verify your email to access the chat."
                    tick={false}
                />
            )}
            <ToastContainer />
        </>
    );
}

export default Chat;
