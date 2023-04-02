import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import cookie from "js-cookie";
import Filter from "bad-words";
import { useLazyQuery, useMutation } from "@apollo/client";

//components
import Friend from "../components/chat/Friend";
import Message from "../components/chat/Message";
import RightSide from "../components/chat/RightSide";
import ChatNavbar from "../components/chat/ChatNavbar";

//navbar options
import Chats from "../components/chat/leftSideParts/Chats";
import ChatProfile from "../components/chat/leftSideParts/ChatProfile";
import ChatSettings from "../components/chat/leftSideParts/ChatSettings";

//mobile
import MobileChatNavbar from "../components/chat/MobileChatNavbar";

//other
import ScreenMessage from "../components/ScreenMessage";

//css
//import "../css/chat.css"

//options, helpers or utils already made by me
import { toastOptions, apiRoute } from "../utils/configs";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import {
    verifiedUser as VERIFIEDUSER,
    getAllUsers as GETALLUSERS,
    IGetVUsers,
    updateUser as UPDATEUSER,
    IMinimumInfo,
} from "../graphql/chat";

//mantine
import {
    Grid,
    Center,
    useMantineTheme,
    createStyles,
    LoadingOverlay,
    useMantineColorScheme,
    Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UseFormReturnType } from "@mantine/form";

//graphql
import { IUserInfo } from "../interfaces/IApiResponses";
import IMessage, {
    IRecieveMessage,
    ISendMessage,
} from "../interfaces/IMessage";

const useStyles = createStyles((theme) => ({
    burger: {
        [theme.fn.largerThan("md")]: {
            display: "none",
        },
    },

    chat: {
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

    //graphql
    const [verifiedUser, { error: verror, loading: vloading }] =
        useLazyQuery(VERIFIEDUSER);
    const [getAllUsers, { error: gerror, loading: gloading }] =
        useLazyQuery(GETALLUSERS);
    const [updateUser, { error }] = useMutation(UPDATEUSER);

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

    const lessthan991px = useMediaQuery(`(max-width: 991px)`);

    const viewport = useRef<HTMLDivElement>(null);
    const dummy = useRef<HTMLSpanElement>(null);

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
    const [selectedFriend, setSelectedFriend] = useState<number>(-1);

    const [visible, setVisible] = useState<boolean>(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        if (userInfo) {
            socket.on("all-msg", (message: IRecieveMessage[]) => {
                setMessages(
                    message.map((msg) => {
                        return {
                            message: msg.message,
                            fromSelf: msg.username === userInfo.username,
                            username: msg.username,
                            id_room: msg.id_room,
                        };
                    })
                );

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "auto",
                });
            });

            socket.on("msg", (message: IRecieveMessage) => {
                setMessages([
                    ...messages,
                    {
                        message: filter.clean(message.message),
                        fromSelf: message.username === userInfo.username,
                        username: userInfo.username,
                        id_room: message.id_room,
                    },
                ]);

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "smooth",
                });

                //dummy.current?.scrollIntoView({ behavior: "smooth" });
            });

            socket.on("new-usr", (newFriend: IUserInfo) => {
                setFriends([...friends, newFriend]);
            });
        }
    }, [userInfo]);

    useEffect(() => {
        if (!isAuthenticated()) {
            signOut();
            navigate("/register");
        }

        //confirms if the token is valid, if not it will delete it, however if is valid it will redirect the user to the profile page
        const _token: string = cookie.get("_auth") as string;

        const getInfo = async (token: string) => {
            //const userData = await getUserInfo(token);
            try {
                const { data: dav } = await verifiedUser({
                    variables: { token: token },
                });

                let userData: IGetVUsers = dav.verifiedUser;

                if (!userData.status)
                    return toast.error(
                        "User info is not available",
                        toastOptions
                    );
                if (!userData.user)
                    return toast.error("No user provided", toastOptions);

                setUserInfo(userData.user[0]);
                if (!userData.user[0].verified) return setVisible(false);

                socket.emit("add-user", userData.user[0].username);

                //const usersData = await getAllUsers(token);
                const { data: davs } = await getAllUsers({
                    variables: { token: token },
                });

                const usersData: IGetVUsers = davs.getUsers;

                if (!usersData.status)
                    return toast.error(
                        "There was an error getting the users information",
                        toastOptions
                    );

                setFriends(usersData.user);

                setVisible(false);
            } catch (e) {}
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

        if (socket && userInfo && selectedFriend >= 0) {
            /*const newMessage: IMessage = {
                message: finalMessage,
                fromSelf: true,
            };*/
            //setMessages([...messages, newMessage]);

            if (friends[selectedFriend].idRoom) {
                socket.emit("send-msg", {
                    person: userInfo.username,
                    message: actualMessage,
                    username_to: friends[selectedFriend].username,
                    id_room: friends[selectedFriend].idRoom,
                } as ISendMessage);
            } else {
                socket.emit("send-msg", {
                    person: userInfo.username,
                    message: actualMessage,
                    username_to: friends[selectedFriend].username,
                    id_room: "1",
                } as ISendMessage);
            }
        }

        setActualMessage("");
    };

    const handleEditProfile = async (
        form: UseFormReturnType<
            {
                username: string;
                email: string;
            },
            (values: { username: string; email: string }) => {
                username: string;
                email: string;
            }
        >
    ) => {
        const errors = form.validate();

        if (errors.hasErrors) {
            return toast.error(
                "There are some errors in the form, please read carefully and fix them",
                toastOptions
            );
        }

        //all the form values are already validated

        const { username, email } = form.values;
        const _token: string = cookie.get("_auth") as string;

        setVisible(true);

        const { data: dav } = await updateUser({
            variables: {
                token: _token,
                updateUser: {
                    email: email,
                    username: username,
                },
            },
        });

        const data: IMinimumInfo = dav.updateUser;

        if (error) console.log(error.message);

        //if the result is not successful, it will show an error message
        //if it is successful, it will navigate to the home page and save the user in local storage
        if (!data?.status) {
            toast.error(data?.message, toastOptions);
        } else {
            toast.success(
                "The user has been successfully updated, refresh to see the changes",
                toastOptions
            );
        }

        setVisible(false);
    };

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={8} />
            {userInfo?.verified ? (
                <>
                    {/*<MobileFriendContainer open={open} setOpen={setOpen}>
                        {friends.map((friend) => (
                            <Friend
                                name={friend.username}
                                key={friend.username}
                                avatarUrl={friend.avatarUrl}
                            />
                        ))}
                        </MobileFriendContainer>*/}

                    <Center
                        sx={{
                            height: lessthan991px ? "90vh" : "100vh",
                            width: "100vw",
                        }}
                    >
                        <Grid
                            sx={{ width: "100%", height: "100%", padding: 0 }}
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
                                    display: lessthan991px ? "none" : "",
                                }}
                            >
                                <ChatNavbar
                                    setSelectedWindow={setSelectedWindow}
                                    selectedWindow={selectedWindow}
                                />
                            </Grid.Col>
                            <Grid.Col
                                span={lessthan991px ? 24 : 5}
                                sx={() => ({
                                    backgroundColor: dark
                                        ? theme.colors.dark[1]
                                        : theme.colors.gray[1],
                                    padding: "0",
                                    minWidth: lessthan991px ? "" : "391px",
                                    height: "100%",
                                })}
                            >
                                {selectedWindow === 0 ? (
                                    <ChatProfile />
                                ) : selectedWindow === 1 ? (
                                    <Chats
                                        avatarUrl={userInfo?.avatarUrl}
                                        username={userInfo?.username}
                                    >
                                        {friends.map((friend, index) => (
                                            <Friend
                                                name={friend.username}
                                                key={friend.username}
                                                avatarUrl={friend.avatarUrl}
                                                onClick={() =>
                                                    setSelectedFriend(index)
                                                }
                                            />
                                        ))}
                                    </Chats>
                                ) : selectedWindow === 2 ? (
                                    <ChatSettings
                                        handleEditProfile={handleEditProfile}
                                        avatarUrl={userInfo.avatarUrl}
                                        username={userInfo.username}
                                        setVisible={setVisible}
                                    />
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
                                className={classes.chat}
                            >
                                <RightSide
                                    sendMessage={sendMessage}
                                    actualMessage={actualMessage}
                                    setActualMessage={setActualMessage}
                                    viewport={viewport}
                                    dummy={dummy}
                                >
                                    {selectedFriend >= 0 ? (
                                        messages.map((message, index) =>
                                            message.id_room ===
                                            friends[selectedFriend].idRoom ? (
                                                <Message
                                                    key={`${message.message}/${
                                                        message.username
                                                    }/${index.toString()}`}
                                                    message={message.message}
                                                    position={
                                                        message.fromSelf
                                                            ? "r"
                                                            : "l"
                                                    }
                                                    displayAvatar={
                                                        messages[index + 1]
                                                            ? messages[
                                                                  index + 1
                                                              ].id_room ===
                                                              message.id_room
                                                                ? messages[
                                                                      index + 1
                                                                  ].username ===
                                                                  message.username
                                                                    ? false
                                                                    : true
                                                                : false
                                                            : true
                                                    }
                                                />
                                            ) : (
                                                <div
                                                    key={`${message.message}/${
                                                        message.username
                                                    }/${index.toString()}`}
                                                    style={{ display: "none" }}
                                                ></div>
                                            )
                                        )
                                    ) : (
                                        <>
                                            <Title order={1}>
                                                NO HAY USUARIOS
                                            </Title>
                                        </>
                                    )}
                                </RightSide>
                            </Grid.Col>
                        </Grid>
                    </Center>
                    <MobileChatNavbar
                        setSelectedWindow={setSelectedWindow}
                        selectedWindow={selectedWindow}
                    />
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
