import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@apollo/client";

//options, helpers or utils components already made by me
import { toastOptions, specialCharacters } from "../utils/configs";
import { callLogin } from "../utils/callApi";
import {
    useSignIn,
    useIsAuthenticated,
    useSignOut,
    useAuthUser,
} from "react-auth-kit";
import { login as LOGIN, ILogin } from "../graphql/login";

//styles
import TextInputStyle from "../utils/MantineStyles/TextInputStyle";

//components
import Navbar from "../components/navbar/Navbar";

//interfaces
import { IAuthResponse } from "../interfaces/IApiResponses";

//assets
import "react-toastify/dist/ReactToastify.css";

//mantine
import {
    Center,
    TextInput,
    Button,
    Group,
    Text,
    Box,
    LoadingOverlay,
    useMantineColorScheme,
    useMantineTheme,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

function Login() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //graphql
    const [login, { error, loading }] = useMutation(LOGIN);

    //auth's funtions
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const auth = useAuthUser();

    //mantine
    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);
    const lessThan550px = useMediaQuery(`(max-width: 550px)`);
    const lessThan350px = useMediaQuery(`(max-width: 350px)`);

    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const textInputClasses = TextInputStyle();

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
     */
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/chat");
        } else {
            signOut();
        }
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

        //if (!captcha.current?.getValue())
        //return toast.error("You must complete the captcha", toastOptions);

        //all the form values are already validated

        const { username, password } = form.values;

        setVisible(true);

        //cals the api to register the user
        //const result: IAuthResponse = await callLogin(username, password);

        const { data: dav } = await login({
            variables: {
                username: username,
                password: password,
            },
        });

        const data: ILogin = dav.login;

        if (error) console.log(error.message);

        //if the result is not successful, it will show an error message
        //if it is successful, it will navigate to the home page and save the user in local storage
        if (!data?.status) {
            toast.error(data?.message, toastOptions);
        } else {
            if (data?.token) {
                signIn({
                    token: data?.token,
                    expiresIn: 2880,
                    tokenType: "Bearer",
                    authState: {
                        username: username,
                    },
                });

                await sleep(1000);

                navigate("/chat");
            } else {
                toast.error(
                    "An error occurred. Please try again laiter",
                    toastOptions
                );
            }
        }

        setVisible(false);
    };

    const onchangeRecaptcha = () => {};

    return (
        <>
            <Navbar />
            <Center
                style={{
                    width: "100%",
                    height: "calc(100vh - 60px)",
                    backgroundColor: dark
                        ? theme.colors.dark[2]
                        : theme.colors.gray[2],
                }}
            >
                <Box
                    sx={(theme) => ({
                        backgroundColor: dark
                            ? theme.colors.dark[1]
                            : theme.colors.gray[5],
                        borderRadius: theme.radius.md,
                        height: "500px",
                    })}
                >
                    <Center sx={{ width: "100%", height: "100%" }}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            style={{ height: "auto" }}
                        >
                            <Stack
                                align={"stretch"}
                                justify={"center"}
                                sx={{
                                    height: "100%",
                                    margin: "1.5rem",
                                    width: lessThan550px
                                        ? "300px"
                                        : lessThan350px
                                        ? "200px"
                                        : "500px",
                                }}
                            >
                                <LoadingOverlay
                                    visible={visible}
                                    overlayBlur={2}
                                />
                                <Text
                                    fw={700}
                                    fz={25}
                                    ta="center"
                                    color={
                                        dark
                                            ? theme.colors.dark[7]
                                            : theme.colors.gray[7]
                                    }
                                >
                                    Hi again
                                </Text>
                                <TextInput
                                    placeholder="Username"
                                    label="Username"
                                    radius="md"
                                    variant="unstyled"
                                    size={
                                        moreThan1800px
                                            ? "md"
                                            : lessThan800px
                                            ? "xs"
                                            : "sm"
                                    }
                                    withAsterisk
                                    {...form.getInputProps("username")}
                                    classNames={textInputClasses.classes}
                                />

                                <TextInput
                                    variant="unstyled"
                                    placeholder="password"
                                    label="Password"
                                    radius="md"
                                    type={"password"}
                                    size={
                                        moreThan1800px
                                            ? "md"
                                            : lessThan800px
                                            ? "xs"
                                            : "sm"
                                    }
                                    withAsterisk
                                    {...form.getInputProps("password")}
                                    classNames={textInputClasses.classes}
                                />

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

                                <Text
                                    size={
                                        moreThan1800px
                                            ? "md"
                                            : lessThan800px
                                            ? "xs"
                                            : "sm"
                                    }
                                    color={dark ? "#9AA1B9" : "#858DA6"}
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
                            </Stack>
                        </form>
                    </Center>
                </Box>
            </Center>
            <ToastContainer />
        </>
    );
}

export default Login;
