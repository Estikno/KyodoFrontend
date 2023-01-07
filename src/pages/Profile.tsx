import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    useSignIn,
    useIsAuthenticated,
    useSignOut,
    useAuthUser,
} from "react-auth-kit";
import cookie from "js-cookie";

//options, helpers or utils already made by me
import { toastOptions } from "../utils/configs";
import { getUserInfo } from "../utils/callApi";

//components
import SideBar from "../components/profile/SideBar";
import ProfileTab from "../components/profile/profileTab/PorfileTab";
import Navbar from "../components/navbar/Navbar";
import PasswordTab from "../components/profile/PasswordTab";
import SensiveOptionsTab from "../components/profile/sensiveOptions/SensiveOptionsTab";
import BlockedUsersTab from "../components/profile/blockedUser/BlockedUsersTab";

//assets
import "../css/profile.css";

//interfaces
import { IAuthResponse } from "../interfaces/IApiResponses";
import IProfileTab from "../interfaces/profile/IProfileTab";

//mantine
import {
    Center,
    useMantineTheme,
    Grid,
    LoadingOverlay,
    Group,
    Text,
    Stack,
} from "@mantine/core";

function Profile() {
    const navigate = useNavigate();
    const theme = useMantineTheme();

    //auth's functions
    const isAuthenticated = useIsAuthenticated();
    const _signOut = useSignOut();
    const auth = useAuthUser();

    //states for the forms and upload buttons
    const [loaderVisible, setLoaderVisible] = useState<boolean>(true);
    const [defToken, setDefToken] = useState<string>("");

    //states for displaying data
    const [avatar, setAvatar] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const profileInitialState: IProfileTab = {
        profile: false,
        password: false,
        sensive: false,
        blockedUsers: false,
        signOut: false,
    };
    const [profileTab, setProfileTab] =
        useState<IProfileTab>(profileInitialState);

    useEffect(() => {
        if (!isAuthenticated()) return navigate("/login");

        const _token: string = cookie.get("_auth") as string;

        const getInfo = async (token: string) => {
            const data: IAuthResponse = await getUserInfo(token);

            if (!data.status) {
                return toast.error(
                    "An error occurred while getting the user",
                    toastOptions
                );
            }

            //here you can do whatever you want because the user is confirmed

            //set the avatar url
            if (!data.user) {
                return toast.error("No user provided", toastOptions);
            }

            if (Array.isArray(data.user))
                return toast.error("User mustn't be an array", toastOptions);

            //set the states variable that are necessary for displaying the profile information
            setAvatar(data.user.avatarUrl);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setIsVerified(data.user.verified);

            setDefToken(token);
            setLoaderVisible(false);
        };

        if (_token) {
            getInfo(_token);
        } else {
            signOut();
            navigate("/login");
        }
    }, []);

    const signOut = () => {
        //localStorage.removeItem(namesLocalStorageData.kyodo_token);
        _signOut();
        navigate("/login");
    };

    return (
        <>
            <Navbar></Navbar>
            <LoadingOverlay visible={loaderVisible} overlayBlur={2} />
            <Center
                style={{
                    height: "90vh",
                    width: "100%",
                }}
            >
                <Stack
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                    align="center"
                    justify={"center"}
                    spacing={"md"}
                >
                    {
                        (!isVerified) ? (<Group
                            sx={{
                                width: "85%",
                                backgroundColor: theme.colors.red[9],
                                height: "6%",
                                borderRadius: theme.radius.md
                            }}
                            position="center"
                        >
                            <Center sx={{width: "100%", height: "100%"}}>
                                <Text ta={"center"} fz="xl" fw={700}>
                                    Your email is not verified. Please verify it
                                    using an email sent to your email adress.
                                </Text>
                            </Center>
                        </Group>): (<></>)
                    }
                    <Grid
                        grow
                        columns={9}
                        style={{ width: "85%", height: "90%"}}
                    >
                        <Grid.Col
                            sm={3}
                            md={1.5}
                            style={{
                                backgroundColor: theme.colors.dark[8],
                                borderTopLeftRadius: theme.radius.md,
                                borderBottomLeftRadius: theme.radius.md
                            }}
                        >
                            <SideBar
                                profileInitialState={profileInitialState}
                                username={username}
                                setProfileTab={setProfileTab}
                                avatarUrl={avatar}
                            />
                        </Grid.Col>
                        <Grid.Col
                            sm={6}
                            md={5}
                            style={{
                                backgroundColor: theme.colors.dark[6],
                                borderTopRightRadius: theme.radius.md,
                                borderBottomRightRadius: theme.radius.md
                            }}
                        >
                            {profileTab.profile ? (
                                <ProfileTab avatarUrl={avatar} />
                            ) : profileTab.password ? (
                                <PasswordTab token={defToken} />
                            ) : profileTab.sensive ? (
                                <SensiveOptionsTab />
                            ) : profileTab.blockedUsers ? (
                                <BlockedUsersTab />
                            ) : profileTab.signOut ? (
                                (signOut(), (<>Sign out</>))
                            ) : (
                                <>Nothing</>
                            )}
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Center>
            <ToastContainer />
        </>
    );
}

export default Profile;
