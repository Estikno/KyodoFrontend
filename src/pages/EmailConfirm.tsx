import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";

//options, helpers or utils already made by me
import { toastOptions } from "../utils/configs";
import {
    emailVerification as EMAILVERIFICATION,
    IEmailVerification,
} from "../graphql/emailVerification";

//components
import ScreenMessage from "../components/ScreenMessage";

//interfaces
import { IAuthResponse } from "../interfaces/IApiResponses";

//mantine
import { LoadingOverlay } from "@mantine/core";

function EmailConfirm() {
    const { token } = useParams();

    //graphql
    const [emailVerification, { error, loading }] =
        useMutation(EMAILVERIFICATION);

    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    const emailData = async () => {
        if (token) {
            const { data: dav } = await emailVerification({
                variables: {
                    token: token,
                },
            });

            const data: IEmailVerification = dav.login;

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
            <LoadingOverlay visible={visible} overlayBlur={5} />

            {isVerified ? (
                <ScreenMessage
                    message="Congratulations! Your email has been
                successfully verified!"
                    text="Now you can chat with everyone"
                    tick={true}
                />
            ) : (
                <ScreenMessage
                    message="The url is not valid! Please use a valid url
                to verify your email."
                    text="Please try a valid url"
                    tick={false}
                />
            )}

            <ToastContainer />
        </>
    );
}

export default EmailConfirm;
