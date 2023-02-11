import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReCaptcha, { ReCAPTCHA as IRecaptcha } from "react-google-recaptcha";

//options, helpers or utils already made by me
import { toastOptions, specialCharacters } from "../utils/configs";
import { callRegister } from "../utils/callApi";
import { useSignIn, useIsAuthenticated, useSignOut } from "react-auth-kit";
import TextInputStyle from "../utils/MantineStyles/TextInputStyle";

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
    TextInput,
    Checkbox,
    Button,
    Group,
    Space,
    PasswordInput,
    Text,
    Box,
    MediaQuery,
    Stack,
    useMantineColorScheme,
    useMantineTheme,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

function Register() {
    //creates a navigate function to navigate to another route
    const navigate = useNavigate();

    //captcha
    const captcha = useRef<IRecaptcha>(null);

    //auth's funtions
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    //mantine
    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);

    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const textInputClasses = TextInputStyle();

    //creates a state for the form values, such as username, password, etc.
    const form = useForm({
        initialValues: {
            username: "",
            email: "",
            password: "",
            termsOfService: false,
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
            email: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Email is required";
                }

                if (!value.includes("@")) {
                    return "Email must contain an @";
                }

                if (!value.includes(".")) {
                    return "Email must contain a .";
                }

                if (value.length > 254) {
                    return "Email must be less than 254 characters";
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
            termsOfService: (value: boolean) => {
                if (!value) {
                    return "You must accept the terms of service";
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
        if (isAuthenticated()) {
            navigate("/profile");
        } else {
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

        if (!captcha.current?.getValue())
            return toast.error("You must complete the captcha", toastOptions);

        //all the form values are already validated

        const { username, email, password } = form.values;

        setVisible(true);

        //cals the api to register the user
        const result: IAuthResponse = await callRegister(
            username,
            email,
            password
        );

        setVisible(false);

        //if the result is not successful, it will show an error message
        //if it is successful, it will navigate to the home page and save the user in local storage
        if (!result.status) {
            toast.error(result.message, toastOptions);
        } else {
            if (result.token) {
                signIn({
                    token: result.token,
                    expiresIn: 2880,
                    tokenType: "Bearer",
                    authState: {
                        username: username,
                    },
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

    const onchangeRecaptcha = () => {};

    return (
        <>
            <Navbar />
            <Center
                style={{
                    width: "100%",
                    height: "90vh",
                    backgroundColor: dark
                        ? theme.colors.dark[2]
                        : theme.colors.gray[2],
                }}
            >
                <Box
                    sx={(theme) => ({
                        backgroundColor: dark
                            ? theme.colors.dark[1]
                            : theme.colors.light[5],
                        borderRadius: theme.radius.md,
                        height: "50vh",
                    })}
                >
                    <Center
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <Stack
                                align={"stretch"}
                                justify={"center"}
                                sx={{
                                    height: "100%",
                                    width: "500px",
                                    margin: "1.5rem",
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
                                    Create an account
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder="Username"
                                    label="Username"
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
                                    classNames={textInputClasses.classes}
                                />
                                <TextInput
                                    variant="unstyled"
                                    placeholder="you@email.com"
                                    label="Email"
                                    radius="md"
                                    size={
                                        moreThan1800px
                                            ? "md"
                                            : lessThan800px
                                            ? "xs"
                                            : "sm"
                                    }
                                    withAsterisk
                                    {...form.getInputProps("email")}
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
                                <Group position="center">
                                    <ReCaptcha
                                        sitekey="6LedrN8jAAAAAOEE-VmfNn80nEYfipvTSNVGcg8S"
                                        theme="dark"
                                        onChange={onchangeRecaptcha}
                                        ref={captcha}
                                        size="normal"
                                    />
                                </Group>

                                <Checkbox
                                    label="I agree to sell my privacy"
                                    size={
                                        moreThan1800px
                                            ? "md"
                                            : lessThan800px
                                            ? "xs"
                                            : "sm"
                                    }
                                    {...form.getInputProps("termsOfService", {
                                        type: "checkbox",
                                    })}
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
                                        Sign Up
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
                                >
                                    Have an account?{" "}
                                    <Link
                                        to="/login"
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Login
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

export default Register;
