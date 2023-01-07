import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";

//options, helpers or utils already made by me
import { toastOptions } from "../utils/configs";
import { emailVerification } from "../utils/callApi";

//interfaces
import { IAuthResponse } from "../interfaces/IApiResponses";

//mantine
import {
    Center,
    Card,
    Image,
    Text,
    Title,
    Stack,
    LoadingOverlay,
} from "@mantine/core";

function EmailConfirm() {
    const { token } = useParams();

    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    const emailData = async () => {
        if (token) {
            const data: IAuthResponse = await emailVerification(token);

            if (!data.status) {
                setVisible(false);
                return setIsVerified(false);
            }

            setIsVerified(true);
            setVisible(false);
        }
    };

    useEffect(() => {
        if (token) {
            emailData();
        } else {
            toast.error(
                "Something went wrong, please try again later.",
                toastOptions
            );
        }
    }, []);

    return (
        <>
            <Center style={{ width: "100%", height: "100vh" }}>
                <Card
                    shadow="sm"
                    p={"lg"}
                    radius="md"
                    withBorder
                    sx={{ width: "30%" }}
                >
                    <LoadingOverlay visible={visible} overlayBlur={5} />
                    <Stack align={"center"} justify="center" spacing={"md"}>
                        {isVerified ? (
                            <>
                                <Title order={2} ta="center">
                                    Congratulations! Your email has been
                                    successfully verified!
                                </Title>
                                <Image
                                    src="https://res.cloudinary.com/kyodo/image/upload/v1672936699/kyodo/icons/ttick_fzspjf.png"
                                    alt="tick"
                                    height={200}
                                    width={200}
                                />
                                <Text fz={"xl"} ta="center">
                                    Now you can chat with everyone
                                </Text>
                            </>
                        ) : (
                            <>
                                <Title order={2} ta="center">
                                    The url is not valid! Please use a valid url
                                    to verify your email.
                                </Title>
                                <Image
                                    src="https://res.cloudinary.com/kyodo/image/upload/v1672939191/kyodo/icons/cross_wf1uzx.png"
                                    alt="tick"
                                    height={200}
                                    width={200}
                                />
                                <Text fz={"xl"} ta="center">
                                    Please try a valid url.
                                </Text>
                            </>
                        )}
                    </Stack>
                </Card>
            </Center>
            <ToastContainer />
        </>
    );
}

export default EmailConfirm;
