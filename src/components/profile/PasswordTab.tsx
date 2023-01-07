import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/configs";

import { changePassword } from "../../utils/callApi";

//component
import TitleTab from "./TitleTab";
import { IAuthResponse } from "../../interfaces/IApiResponses";

//mantine
import { Button, Group, Text, Stack, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

function PasswordTab({token}: {token: string}) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);
    const lessThan600px = useMediaQuery(`(max-width: 600px)`);

    const passwordForm = useForm({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        validate: {
            oldPassword: (value: string) => {
                if(!value || value.trim.length > 0){
                    return "Old password is required";
                }

                return null;
            },
            newPassword: (value: string) => {
                if (!value || value.trim.length > 0) {
                    return "Password is required";
                }

                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }

                return null;
            },
            confirmPassword: (value: string, values) => {
                if (!value || value.trim.length > 0) {
                    return "Confirm Password is required";
                }

                if (value !== values.newPassword) {
                    return "Passwords must match";
                }

                return null;
            },
        },
    });

    const handleSubmit = async () => {
        const errors = passwordForm.validate();

        if(errors.hasErrors){
            return toast.error("There are some errors in the form. Please pay attention to those and correct them.",
            toastOptions);
        }

        //the form is valid

        const {oldPassword, newPassword} = passwordForm.values;

        //calls the api to change the password

        const result: IAuthResponse = await changePassword(newPassword, oldPassword, token);

        //if the result is not successful it will show an error message
        if(!result.status){
            toast.error(result.message, toastOptions);
        }
        else{
            toast.success(result.message, toastOptions);
        }

        //resets the values of the password form to its initial values
        passwordForm.reset();
    };

    return (
        <>
            <TitleTab title="Password" />

            <Group
                grow
                style={{
                    width: lessThan600px ? "100%" : "clamp(320px, 50%, 500px)",
                    padding: "0 .5rem",
                }}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Stack>
                        <PasswordInput
                            placeholder="Old Password"
                            label="Old Password"
                            withAsterisk
                            size={lessThan876px ? "xs" : "sm"}
                            {...passwordForm.getInputProps("oldPassword")}
                        />
                        <PasswordInput
                            placeholder="New Password"
                            label="New Password"
                            withAsterisk
                            size={lessThan876px ? "xs" : "sm"}
                            {...passwordForm.getInputProps("newPassword")}
                        />
                        <PasswordInput
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            withAsterisk
                            size={lessThan876px ? "xs" : "sm"}
                            {...passwordForm.getInputProps("confirmPassword")}
                        />

                        <Button
                            type="submit"
                            size={lessThan876px ? "xs" : "sm"}
                        >
                            Change password
                        </Button>
                    </Stack>
                    <Text size={lessThan876px ? "xs" : "md"}>
                        <Link
                            to="/login"
                            style={{
                                color: "white",
                            }}
                        >
                            I forgot my password
                        </Link>
                    </Text>
                </form>
            </Group>
        </>
    );
}

export default PasswordTab;
