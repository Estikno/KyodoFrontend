import React from "react";

//mantine
import {
    Group,
    MediaQuery,
    Burger,
    TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";


function Bar({open, setOpen}: {open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const lessThan500px = useMediaQuery(`(max-width: 500px)`);
    const lessThan992px = useMediaQuery(`(max-width: 992px)`);

    return (
        <Group
            position="apart"
            spacing={0}
            sx={{
                backgroundColor: "gray",
                height: lessThan500px ? "4vh" : "5vh",
            }}
        >
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Group sx={{ width: "25vw", padding: "0 5px" }}>
                    <TextInput
                        variant="filled"
                        placeholder="Search a user"
                        sx={{ width: "100%" }}
                    />
                </Group>
            </MediaQuery>

            <Group
                position="apart"
                sx={{
                    width: lessThan992px ? "100vw" : "75vw",
                    padding: "0 10px",
                }}
            >
                <Group spacing="xs">
                    <MediaQuery largerThan="md" styles={{ display: "none" }}>
                        <Burger
                            opened={open}
                            onClick={() => setOpen((o) => !o)}
                            style={{
                                height: "100%",
                            }}
                        />
                    </MediaQuery>
                </Group>
            </Group>
        </Group>
    );
}

export default Bar;
