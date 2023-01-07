import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import cookie from 'js-cookie';

//options, helpers or utils components already made by me
import {
    toastOptions,
    specialCharacters,
} from "../utils/configs";
import { callLogin } from "../utils/callApi";
import * as apiRoutes from "../utils/apiRoutes";
import { useSignIn, useIsAuthenticated, useSignOut, useAuthUser } from "react-auth-kit";

//components
import Navbar from "../components/navbar/Navbar";
import LeftSide from "../components/auth/LeftSide";

//interfaces
import { IAuthResponse } from "../interfaces/IApiResponses";

//assets
import "react-toastify/dist/ReactToastify.css";

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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

function Login() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //auth's funtions
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const auth = useAuthUser();

    //mantine
    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);

    //creates a state for the form values, such as username, password, etc.
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },

        validate: {
            username: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Username is required";
                }

                if (value.length < 3) {
                    return "Username must be at least 3 characters";
                }

                if (value.length > 20) {
                    return "Username must be less than 20 characters";
                }

                if (specialCharacters.test(value)) {
                    return "Username cannot contain special characters";
                }

                return null;
            },
            password: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Password is required";
                }

                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }

                return null;
            },
        },
    });

    const [visible, setVisible] = useState<boolean>(false);

    /**
     * When the page is loaded, this function is called.
     * It checks if there is a user in local storage.
     * If there is it will confirm the user
     * If the confirmation is successful, it will navigate to the home page
     * If not it will remove the user from local storage
     * ! The async function has to be defined inside the useEffect function because useEffect does not support calling async functions
     */
    useEffect(() => {
        if(isAuthenticated()){
            navigate("/profile");
        }
        else{
            signOut();
        }

        /*//confirms if the token is valid, if not it will delete it, however if is valid it will redirect the user to the profile page
        const tokenStorage: string = localStorageControllers.getLocalStorage(
            namesLocalStorageData.kyodo_token
        );

        const confirmLocalStorageData = async (token: string) => {
            const { data } = await axios.get(apiRoutes.verifyToken, {
                headers: { token: token },
            });

            if (data.status) {
                navigate("/profile");
            } else {
                localStorageControllers.removeLocalStorage(
                    namesLocalStorageData.kyodo_token
                );
            }
        };

        if (tokenStorage) {
            //navigate("/profile");
            confirmLocalStorageData(tokenStorage);
        }*/
    }, []);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    //creates a function to handle the form submission
    const handleSubmit = async () => {
        const errors = form.validate();

        if (errors.hasErrors) {
            return toast.error(
                "There are some errors in the form, please read carefully and fix them",
                toastOptions
            );
        }

        //all the form values are already validated

        const { username, password } = form.values;

        setVisible(true);

        //cals the api to register the user
        const result: IAuthResponse = await callLogin(username, password);

        setVisible(false);

        //if the result is not successful, it will show an error message
        //if it is successful, it will navigate to the home page and save the user in local storage
        if (!result.status) {
            toast.error(result.message, toastOptions);
        } else {
            if (result.token) {
                /*localStorage.setItem(
                    namesLocalStorageData.kyodo_token,
                    result.token
                );*/

                signIn({
                    token: result.token,
                    expiresIn: 2880,
                    tokenType: "Bearer",
                    authState: {
                        username: username,
                    }
                });

                setVisible(true);

                await sleep(1000);

                setVisible(false);

                navigate("/profile");
            } else {
                toast.error(
                    "An error occurred. Please try again laiter",
                    toastOptions
                );
            }
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <Center style={{ width: "100%", height: "90vh" }}>
                <SimpleGrid
                    cols={2}
                    style={{
                        height: "70vh",
                        width: lessThan800px ? "90vw" : "60vw",
                    }}
                    breakpoints={[
                        { minWidth: 1281, cols: 2 },
                        { maxWidth: 1279, cols: 1 },
                    ]}
                >
                    <LeftSide
                        MainTitle="Sign In"
                        Text="Connect to your account to continue chatting!"
                    />
                    <Box
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[5]
                                    : theme.colors.light[5],
                            borderRadius: theme.radius.md,
                        })}
                    >
                        <Center style={{ width: "100%", height: "100%" }}>
                            <MediaQuery
                                largerThan={1800}
                                styles={{
                                    width: "70%",
                                    height: "85%",
                                }}
                            >
                                <MediaQuery
                                    smallerThan={850}
                                    styles={{
                                        width: "90%",
                                        height: "80%",
                                    }}
                                >
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }}
                                        style={{ height: "auto" }}
                                    >
                                        <LoadingOverlay
                                            visible={visible}
                                            overlayBlur={2}
                                        />
                                        <TextInput
                                            placeholder="Username"
                                            label="Username"
                                            description="The username can't contain special characters, such as: @_./, etc"
                                            radius="md"
                                            size={
                                                moreThan1800px
                                                    ? "md"
                                                    : lessThan800px
                                                    ? "xs"
                                                    : "sm"
                                            }
                                            withAsterisk
                                            {...form.getInputProps("username")}
                                        />

                                        <Space h="sm" />

                                        <PasswordInput
                                            placeholder="password"
                                            label="Password"
                                            description="Password must be at least 8 characters long"
                                            radius="md"
                                            size={
                                                moreThan1800px
                                                    ? "md"
                                                    : lessThan800px
                                                    ? "xs"
                                                    : "sm"
                                            }
                                            withAsterisk
                                            {...form.getInputProps("password")}
                                        />

                                        <Space h="sm" />

                                        <Group position="center" grow>
                                            <Button
                                                size={
                                                    moreThan1800px
                                                        ? "md"
                                                        : lessThan800px
                                                        ? "xs"
                                                        : "sm"
                                                }
                                                type="submit"
                                            >
                                                Sign In
                                            </Button>
                                        </Group>

                                        <Space h="sm" />

                                        <Text
                                            size={
                                                moreThan1800px
                                                    ? "md"
                                                    : lessThan800px
                                                    ? "xs"
                                                    : "sm"
                                            }
                                        >
                                            Don't have an account?{" "}
                                            <Link
                                                to="/register"
                                                style={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Sign Up
                                            </Link>
                                        </Text>
                                    </form>
                                </MediaQuery>
                            </MediaQuery>
                        </Center>
                    </Box>
                </SimpleGrid>
            </Center>
            <ToastContainer />
        </>
    );
}

export default Login;
