import React, { useState } from "react";

//mantine
import {
    TextInput,
    Button,
    Group,
    Space,
    Text,
    Title,
    Modal,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UseFormReturnType } from "@mantine/form";

function ModalComp({
    form,
    title,
    description,
    valueToChange,
    handleSubmit,
    isEmail
}: {
    form: UseFormReturnType<any>;
    title: string;
    description: string;
    valueToChange: string;
    handleSubmit: (email: boolean) => Promise<any>;
    isEmail: boolean;
}) {
    const lesstThan876px = useMediaQuery("(max-width: 876px)");

    //states necessary for displaying UI elements
    const [changeModal, setChangeModal] = useState<boolean>(false);

    return (
        <>
            <Title order={lesstThan876px ? 3 : 2}>{title}</Title>

            <Space h="sm" />

            <Text size={lesstThan876px ? "sm" : "md"}>{description}</Text>

            <Button
                variant="default"
                style={{ marginTop: "5px" }}
                onClick={() => setChangeModal(true)}
            >
                Change {valueToChange}
            </Button>

            <Modal
                opened={changeModal}
                onClose={() => setChangeModal(false)}
                title={`Change your ${valueToChange}`}
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(isEmail);
                }}>
                    <TextInput
                        placeholder={`New ${valueToChange}`}
                        label={`New ${valueToChange}`}
                        withAsterisk
                        {...form.getInputProps(`new${valueToChange}`)}
                    />
                    <TextInput
                        placeholder={`Confirm ${valueToChange}`}
                        label={`Confirm ${valueToChange}`}
                        withAsterisk
                        {...form.getInputProps(`confirm${valueToChange}`)}
                    />

                    <Space h="md" />

                    <Group position="center" grow>
                        <Button type="submit">Change {valueToChange}</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}

export default ModalComp;
