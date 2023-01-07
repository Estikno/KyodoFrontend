import React from "react";

//mantine
import { Button, Text, Stack, Title, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function Info({
    title,
    description,
    buttonText,
    setModalOpened,
}: {
    title: string;
    description: string;
    buttonText: string;
    setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <Stack spacing="sm" align="flex-start">
            <Title color="red" order={lessThan876px ? 3 : 2}>
                {title}
            </Title>
            <Divider
                size="xs"
                style={{
                    width: "100%",
                }}
            />
            <Text size={lessThan876px ? "sm" : "md"}>{description}</Text>
            <Button
                color="red"
                size={lessThan876px ? "xs" : "sm"}
                onClick={() => {
                    setModalOpened(true);
                }}
            >
                {buttonText}
            </Button>
        </Stack>
    );
}

export default Info;
