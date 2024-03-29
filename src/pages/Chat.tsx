import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import cookie from "js-cookie";
import { useLazyQuery, useMutation } from "@apollo/client";
import { v4 as uuid } from "uuid";

//redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser, deleteUser } from "../features/auth/authSlice";
import {
    setFriends,
    addFriend,
    addFriendWithVerification,
} from "../features/chat/friendSlice";
import { addMessage, setMessages } from "../features/chat/messageSlice";
import {
    addConnected,
    setConnectedUsers,
    IConnectedUser,
    modifyConnectedUsers,
} from "../features/chat/connectedUserSlice";

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

    /*chat: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },*/
}));

const socket: Socket = io(apiRoute);
const timeBtwMessages: number = 2500; //in milliseconds

function Chat() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //redux
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth);
    const friends = useAppSelector((state) => state.friend);
    const messages = useAppSelector((state) => state.message);
    const selectedFriend = useAppSelector((state) => state.selectedFriend);

    //graphql
    const [verifiedUser, { error: verror, loading: vloading }] =
        useLazyQuery(VERIFIEDUSER);
    const [getAllUsers, { error: gerror, loading: gloading }] =
        useLazyQuery(GETALLUSERS);
    const [updateUser, { error }] = useMutation(UPDATEUSER);

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

    const [actualMessage, setActualMessage] = useState<string>("");
    const [lastMessageDate, setLastMessageDate] = useState<Date>();
    const [selectedWindow, setSelectedWindow] = useState<number>(1);
    const [number, setNumber] = useState<number>(0);
    const [showChatSmall, setShowChatSmall] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        if (userInfo.username != "" && number === 0) {
            socket.on("all-msg", (message: IRecieveMessage[]) => {
                dispatch(
                    setMessages(
                        message.map((msg) => {
                            return {
                                message: msg.message,
                                fromSelf: msg.username === userInfo.username,
                                username: msg.username,
                                id_room: msg.id_room,
                            } as IMessage;
                        })
                    )
                );

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "auto",
                });
            });

            socket.on("msg", (message: IRecieveMessage) => {
                dispatch(
                    addMessage({
                        message: message.message, //filter.clean(message.message),
                        fromSelf: message.username === userInfo.username,
                        username: message.username,
                        id_room: message.id_room,
                    } as IMessage)
                );

                /*if (message.update) {
                    setFriends((prevstate) => {
                        const newFriends = [...prevstate];
                        newFriends[selectedFriend] = {
                            ...newFriends[selectedFriend],
                            idRoom: message.id_room,
                        };
                        return newFriends;
                    });
                }*/

                viewport.current?.scrollTo({
                    top: viewport.current.scrollHeight,
                    behavior: "auto",
                });

                //dummy.current?.scrollIntoView({ behavior: "smooth" });
            });

            socket.on("new-usr", (newFriend: IUserInfo) => {
                dispatch(addFriendWithVerification(newFriend));
            });

            socket.on(
                "update",
                (update: {
                    user1: string;
                    user2: string;
                    users1: any;
                    users2: any;
                }) => {
                    if (userInfo.username === update.user1) {
                        console.log("update user 1");
                        dispatch(setFriends(update.users1));
                    } else if (userInfo.username === update.user2) {
                        console.log("update user 2");
                        dispatch(setFriends(update.users2));
                    }

                    console.log("Mi ususario: " + userInfo.username);
                    console.log("El update: " + update.user2);
                }
            );

            socket.on("connected-now", (connectedUsers: IConnectedUser[]) => {
                dispatch(setConnectedUsers(connectedUsers));
            });

            socket.on("add-connected-user", (username: string) => {
                dispatch(modifyConnectedUsers({ username, connected: true }));
            });

            socket.on("off-connected-user", (username: string) => {
                dispatch(modifyConnectedUsers({ username, connected: false }));
            });

            setNumber(1);
        }
    }, [userInfo]);

    useEffect(() => {
        console.log(friends);
    }, [friends]);

    /*useEffect(() => {
        console.log(messages);
    }, [messages]);*/

    useEffect(() => {
        //console.log(selectedFriend);

        if (selectedFriend >= 0) setShowChatSmall(true);
    }, [selectedFriend]);

    /*useEffect(() => {
        if (userInfo.username !== "") console.log(userInfo);
    }, [userInfo]);*/

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

                //set redux user info
                dispatch(setUser(userData.user[0]));

                if (!userData.user[0].verified) return setVisible(false);

                socket.emit("add-user", userData.user[0].username);
                socket.emit("connected-users", userData.user[0].username);

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

                //set redux friends
                dispatch(setFriends(usersData.user));

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

        /*if (lastMessageDate) {
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
        }*/

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

            if (friends[selectedFriend].idRoom !== "") {
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

    const getNextUserMessageOnRoom = (
        roomId: string,
        index: number
    ): number => {
        let nextRoomMessage: number = -1;

        for (let i = 0; i < messages.length; i++) {
            if (i > index && messages[i].id_room === roomId) {
                nextRoomMessage = i;
                break;
            }
        }

        return nextRoomMessage;
    };

    /*const manual_disconnect = () => {
        socket.emit("manual_disconnect", userInfo.username);
        dispatch(deleteUser());
    };*/

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={8} />
            {userInfo?.verified && !visible ? (
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
                                    //manual_disconnect={manual_disconnect}
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
                                    display: lessthan991px
                                        ? showChatSmall
                                            ? "none"
                                            : ""
                                        : "",
                                    height: "100%",
                                })}
                            >
                                {selectedWindow === 0 ? (
                                    <ChatProfile />
                                ) : selectedWindow === 1 ? (
                                    <Chats />
                                ) : selectedWindow === 2 ? (
                                    <ChatSettings
                                        handleEditProfile={handleEditProfile}
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
                                    height: lessthan991px ? "100vh" : "100%",
                                    display: lessthan991px
                                        ? showChatSmall
                                            ? ""
                                            : "none"
                                        : "",
                                }}
                                //className={classes.chat}
                            >
                                <RightSide
                                    sendMessage={sendMessage}
                                    actualMessage={actualMessage}
                                    setActualMessage={setActualMessage}
                                    viewport={viewport}
                                    dummy={dummy}
                                    setShowChatSmall={setShowChatSmall}
                                    friend={
                                        selectedFriend >= 0
                                            ? friends[selectedFriend]
                                            : undefined
                                    }
                                >
                                    {selectedFriend >= 0 ? (
                                        messages.map((message, index) =>
                                            message.id_room ===
                                            friends[selectedFriend].idRoom ? (
                                                <Message
                                                    key={uuid()}
                                                    message={message.message}
                                                    position={
                                                        message.fromSelf
                                                            ? "r"
                                                            : "l"
                                                    }
                                                    displayAvatar={
                                                        messages[index + 1]
                                                            ? getNextUserMessageOnRoom(
                                                                  message.id_room,
                                                                  index
                                                              ) !== -1
                                                                ? messages[
                                                                      getNextUserMessageOnRoom(
                                                                          message.id_room,
                                                                          index
                                                                      )
                                                                  ].username ===
                                                                  message.username
                                                                    ? false
                                                                    : true
                                                                : true
                                                            : true
                                                    }
                                                />
                                            ) : (
                                                <div
                                                    key={uuid()}
                                                    style={{
                                                        display: "none",
                                                    }}
                                                ></div>
                                            )
                                        )
                                    ) : (
                                        <>
                                            <Title order={1} key={uuid()}>
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
                        showChatSmall={showChatSmall}
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
