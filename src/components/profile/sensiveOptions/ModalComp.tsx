import React from "react";

//mantine
import { Button, Text, Stack, Modal } from "@mantine/core";

function ModalComp({
    title,
    description,
    buttonText,
    modalOpened,
    setModalOpened,
    func
}: {
    title: string;
    description: string;
    buttonText: string;
    modalOpened: boolean;
    setModalOpened: (value: React.SetStateAction<boolean>) => void;
    func: () => Promise<any>;
}) {

    return (
        <Modal
            opened={modalOpened}
            onClose={() => {
                setModalOpened(false);
            }}
            title={title}
        >
            <Stack>
                <Text>{description}</Text>
                <Button color="red" onClick={() => {
                    func();
                }}>{buttonText}</Button>
            </Stack>
        </Modal>
    );
}

export default ModalComp;
