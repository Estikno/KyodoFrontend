import React from "react";

//mantine
import { TextInput, Button, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BiUser } from "react-icons/bi";

function SearchUser({ buttonText }: { buttonText: string }) {
    const lessThan600px = useMediaQuery(`(max-width: 600px)`);
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <form action="">
            <Stack>
                <TextInput
                    label="Search by username"
                    icon={<BiUser />}
                    size={lessThan876px ? "xs" : "sm"}
                    style={{
                        width: lessThan600px
                            ? "100%"
                            : "clamp(400px, 50%, 800px)",
                    }}
                />
                <Button
                    size={lessThan876px ? "xs" : "sm"}
                    color="red"
                    style={{
                        width: lessThan600px
                            ? "100%"
                            : "clamp(400px, 50%, 800px)",
                    }}
                >
                    {buttonText}
                </Button>
            </Stack>
        </form>
    );
}

export default SearchUser;
