import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReCaptcha, { ReCAPTCHA as IRecaptcha } from "react-google-recaptcha";
import { useMutation } from "@apollo/client";

//options, helpers or utils already made by me
import { toastOptions, specialCharacters } from "../utils/configs";
import { callRegister } from "../utils/callApi";
import { useSignIn, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { register as REGISTER, IRegister } from "../graphql/register";

//styles
import TextInputStyle from "../utils/MantineStyles/TextInputStyle";
import CheckBoxStyle from "../utils/MantineStyles/CheckBoxStyle";

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
    Checkbox,
    Button,
    Group,
    Text,
    Box,
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

    //graphql
    const [register, { error, loading }] = useMutation(REGISTER);

    //captcha
    const captcha = useRef<IRecaptcha>(null);

    //auth's funtions
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    //mantine
    const moreThan1800px = useMediaQuery(`(min-width: 1800px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);
    const lessThan550px = useMediaQuery(`(max-width: 550px)`);
    const lessThan350px = useMediaQuery(`(max-width: 350px)`);

    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const textInputClasses = TextInputStyle();
    const checkBoxClasses = CheckBoxStyle();

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
     */
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/profile");
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

        if (!captcha.current?.getValue())
            return toast.error("You must complete the captcha", toastOptions);

        //all the form values are already validated

        const { username, email, password } = form.values;

        setVisible(true);

        //cals the api to register the user
        /*const result: IAuthResponse = await callRegister(
            username,
            email,
            password
        );*/
        const { data: dav } = await register({
            variables: {
                username: username,
                password: password,
                email: email,
            },
        });

        const data: IRegister = dav.register;

        if (error) console.log(error.message);

        //if the result is not successful, it will show an error message
        //if it is successful, it will navigate to the home page and save the user in local storage
        if (!data?.status) {
            toast.error(data?.message, toastOptions);
        } else {
            if (data?.token) {
                signIn({
                    token: data.token,
                    expiresIn: 2880,
                    tokenType: "Bearer",
                    authState: {
                        username: username,
                    },
                });

                await sleep(1000);

                navigate("/profile");
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
                        height: "620px",
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
                                        theme={dark ? "dark" : "light"}
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
                                    classNames={checkBoxClasses.classes}
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
                                        disabled={loading}
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
                                    color={dark ? "#9AA1B9" : "#858DA6"}
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
