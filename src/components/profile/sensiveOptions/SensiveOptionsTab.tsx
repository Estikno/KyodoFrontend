import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//components
import TitleTab from "../TitleTab";
import ModalComp from "./ModalComp";
import Info from "./Info";

//utils
import { deleteUser } from "../../../utils/callApi";
import { toastOptions } from "../../../utils/configs";

//mantine
import { Space } from "@mantine/core";

function SensiveOptions() {
    const navigate = useNavigate();

    //nedeed variables to show the UI
    const [desModalOpened, setDesModalOpened] = useState<boolean>(false);
    const [deleModalOpened, setDeleModalOpened] = useState<boolean>(false);

    const deleteAccount = async () => {
        /*const token: string = getLocalStorage(
            namesLocalStorageData.kyodo_token
        );
        const data = await deleteUser(token);

        if (!data.status) {
            return toast.error(data.message, toastOptions);
        }

        localStorage.removeItem(namesLocalStorageData.kyodo_token);
        navigate("/login");*/
    };

    const desactivateAccount = async () => {};

    return (
        <>
            <TitleTab title="Sensive Options" />

            <Info
                title="Desactivate Account"
                description="Your account will be desactivated util you decide to return."
                buttonText="Desactivate account"
                setModalOpened={setDesModalOpened}
            />

            <Space h="xl" />

            <Info
                title="Delete Account"
                description="Once you delete your account, there is no going back. Please
                be certain."
                buttonText="Delete account"
                setModalOpened={setDeleModalOpened}
            />

            <ModalComp
                title="Delete your account"
                description="Are you sure you want to delete your account? There is
                        no way back, please be concerned."
                buttonText="Delete Account"
                modalOpened={deleModalOpened}
                setModalOpened={setDeleModalOpened}
                func={deleteAccount}
            />

            <ModalComp
                title="Desactivate your account"
                description="Once you desactivate your account noone could see your
                profile or chat you. You can activate it back, however
                if your account is desactivated for more than 6 months
                it will deleted."
                buttonText="Desactivate Account"
                modalOpened={desModalOpened}
                setModalOpened={setDesModalOpened}
                func={desactivateAccount}
            />
        </>
    );
}

export default SensiveOptions;
