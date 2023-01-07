import React from "react";

//mantine
import { BackgroundImage, Box, Title, MediaQuery, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function LeftSide({MainTitle, Text} : {MainTitle: string, Text: string}) {
    //mantine
    const lessThan1279px = useMediaQuery(`(max-width: 1279px)`);
    const lessThan800px = useMediaQuery(`(max-width: 800px)`);

    return (
        <MediaQuery smallerThan={1279} styles={{ height: "30vh" }}>
            <Box
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.light[6],
                    borderRadius: theme.radius.md,
                })}
                style={{ height: "auto" }}
            >
                <BackgroundImage
                    src="https://res.cloudinary.com/kyodo/image/upload/v1661014048/rose-petals_rupjfe.png"
                    radius="md"
                    style={{ width: "100%", height: "100%" }}
                >
                    <Stack
                        style={
                            lessThan1279px
                                ? { height: "100%" }
                                : {
                                      height: "60%",
                                  }
                        }
                        justify="space-around"
                        align="center"
                    >
                        <Title order={1} size={lessThan800px ? "h2" : "h1"}>
                            {MainTitle}
                        </Title>
                        <Title
                            order={1}
                            size={lessThan800px ? "h2" : "h1"}
                            style={{ textAlign: "center", padding: "0 1rem" }}
                        >
                            {Text}
                        </Title>
                    </Stack>
                </BackgroundImage>
            </Box>
        </MediaQuery>
    );
}

export default LeftSide;
