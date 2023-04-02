import React, { useEffect, useState } from "react";
import cookie from 'js-cookie';

import { specialCharacters, toastOptions } from "../../../utils/configs";
import { toast } from "react-toastify";

//components
import TitleTab from "../TitleTab";
import ModalComp from "./ModalComp";

//utils, configs...
import { changeAvatar, removeAvatar, updateUser } from "../../../utils/callApi";
//import { getLocalStorage } from "../../../utils/localStorage";

//mantine
import {
    Grid,
    Group,
    Space,
    Image,
    Text,
    Indicator,
    Menu,
    FileButton,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { BiPencil } from "react-icons/bi";
import { IAuthResponse } from "../../../interfaces/IApiResponses";

function PorfileTab({ avatarUrl }: { avatarUrl: string }) {
    const moreThan1312px = useMediaQuery("(min-width: 1312px)");
    const lesstThan876px = useMediaQuery("(max-width: 876px)");

    //states necessary for displaying UI elements
    const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);

    //states necessary for the functionality
    const usernameForm = useForm({
        initialValues: {
            newUsername: "",
            confirmUsername: "",
        },

        validate: {
            newUsername: (value: string) => {
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
            confirmUsername: (value: string, values) => {
                if (!value || value.trim.length > 0) {
                    return "Confirm Username is required";
                }

                if (value !== values.newUsername) {
                    return "Usernames must match";
                }

                return null;
            },
        },
    });

    const emailForm = useForm({
        initialValues: {
            newEmail: "",
            confirmEmail: "",
        },

        validate: {
            newEmail: (value: string) => {
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
            confirmEmail: (value: string, values) => {
                if (!value || value.trim.length > 0) {
                    return "Confirm Email is required";
                }

                if (value !== values.newEmail) {
                    return "Emails must match";
                }

                return null;
            },
        },
    });

    const [newAvatar, setNewAvatar] = useState<File | null>(null);

    const handleSubmit = async (email: boolean) => {
        const errors = email ? emailForm.validate() : usernameForm.validate();

        if (errors.hasErrors) {
            return toast.error(
                "There are some errors in the form. Please pay attention to those and correct them.",
                toastOptions
            );
        }

        //the form is valid

        const token: string = cookie.get("_auth") as string;
        
        const data: IAuthResponse = email
            ? await updateUser(token, { email: emailForm.values.newEmail })
            : await updateUser(token, {
                  username: usernameForm.values.newUsername,
              });


        if (!data.status) {
            return toast.error(data.message, toastOptions);
        }

        return toast.success(data.message, toastOptions);
    };

    //*Avatar related functions

    //excecutes when the new avatar is changed
    useEffect(() => {
        //call the api to update the avatar
        const changeAv = async (image: File) => {
            const token: string = cookie.get("_auth") as string;
            const data: IAuthResponse = await changeAvatar(image, token);

            if (!data.status) {
                return toast.error(
                    "There was an error updating the avatar. Please try again later",
                    toastOptions
                );
            }

            return toast.success(data.message, toastOptions);
        };

        //confirm if the avatar is something and not null
        if (newAvatar) {
            //changeAv(newAvatar);
            console.log(newAvatar);
        }
    }, [newAvatar]);

    const removeAvatarEvent = async () => {
        const token: string = cookie.get("_auth") as string;
        const data: IAuthResponse = await removeAvatar(token);

        if (!data.status) {
            return toast.error(data.message, toastOptions);
        }

        return toast.success(data.message, toastOptions);
    };

    return (
        <>
            <TitleTab title="Profile" />

            <Grid
                style={{
                    width: "100%",
                    color: "white",
                    margin: 0,
                    padding: 0,
                }}
                grow
            >
                <Grid.Col md={7} xs={12} order={moreThan1312px ? 1 : 2}>
                    <ModalComp
                        form={usernameForm}
                        title="Change username"
                        description="Changing your username may cause blablablablabablablablablabablablablablaba"
                        valueToChange="Username"
                        handleSubmit={handleSubmit}
                        isEmail={false}
                    />

                    <Space h="lg" />
                    <Space h="lg" />

                    <ModalComp
                        form={emailForm}
                        title="Change email"
                        description="Changing your email may cause blablablablabablablablablabablablablablaba"
                        valueToChange="Email"
                        handleSubmit={handleSubmit}
                        isEmail={true}
                    />
                </Grid.Col>
                <Grid.Col md={5} xs={12} order={moreThan1312px ? 2 : 1}>
                    {/*<Title order={3}>Profile picture</Title>*/}
                    <Group position="center">
                        <Menu
                            withArrow
                            opened={avatarMenuOpen}
                            onChange={setAvatarMenuOpen}
                            offset={-5}
                            position="bottom-start"
                        >
                            <Menu.Target>
                                <Indicator
                                    position="bottom-start"
                                    offset={30}
                                    size={40}
                                    withBorder
                                    radius="md"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setAvatarMenuOpen(!avatarMenuOpen)
                                    }
                                    label={
                                        <Text size="xl">
                                            <BiPencil />
                                            Edit
                                        </Text>
                                    }
                                >
                                    <Image
                                        src={avatarUrl}
                                        width={lesstThan876px ? 220 : 300}
                                        height={lesstThan876px ? 220 : 300}
                                        alt="avatar"
                                    />
                                </Indicator>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Stack
                                    style={{
                                        color: "gray",
                                        padding: "5px",
                                        cursor: "pointer",
                                    }}
                                    align="center"
                                    spacing="xs"
                                    justify="center"
                                >
                                    <FileButton
                                        onChange={setNewAvatar}
                                        accept="image/png,image/jpeg,image/jpg,image/svg"
                                    >
                                        {(props) => (
                                            <Text
                                                {...props}
                                                size={
                                                    lesstThan876px ? "sm" : "md"
                                                }
                                            >
                                                Upload an avatar...
                                            </Text>
                                        )}
                                    </FileButton>
                                    <Text
                                        size={lesstThan876px ? "sm" : "md"}
                                        onClick={removeAvatarEvent}
                                    >
                                        Remove avatar
                                    </Text>
                                </Stack>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default PorfileTab;
