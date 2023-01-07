import React from "react";

import TitleTab from "../TitleTab";
import BlockedUser from "./BlockedUser";
import SearchUser from "./SearchUser";
import ListContainer from './ListContainer';
import ListItem from './ListItem';

//mantine
import { Stack, Title, ScrollArea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

function BlockedUsersTab() {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <>
            <TitleTab title="Block a Users" />
            <Stack>

                <ListContainer title="Blocked users are not able of:">
                    <ListItem text="chatting you"/>
                    <ListItem text="sending you a friend request"/>
                    <ListItem text="calling you"/>
                </ListContainer>

                <ListContainer title="In addition you:">
                    <ListItem text="don't recieve any notification of him"/>
                    <ListItem text="don't recieve any update of him"/>
                </ListContainer>

                <SearchUser buttonText="Block User" />

                <Stack>
                    <Title order={lessThan876px ? 3 : 2}>Blocked Users</Title>
                    <ScrollArea.Autosize
                        maxHeight={225}
                        type="scroll"
                        sx={(theme) => ({
                            maxWidth: 900,
                            borderRadius: theme.radius.md,
                            border: "1px solid gray",
                            padding: "5px",
                        })}
                    >
                        <Stack>
                            <BlockedUser
                                name="Pepito69"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                            <BlockedUser
                                name="Pepito69"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                            <BlockedUser
                                name="Pepito69"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                            <BlockedUser
                                name="Pepito69"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                            <BlockedUser
                                name="Pepito69"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                            <BlockedUser
                                name="Pepe"
                                avatarUrl="https://res.cloudinary.com/kyodo/image/upload/v1661105003/kyodo/avatars/ltcy80smngxm3c3iztfj.png"
                            />
                        </Stack>
                    </ScrollArea.Autosize>
                </Stack>
            </Stack>
        </>
    );
}

export default BlockedUsersTab;
