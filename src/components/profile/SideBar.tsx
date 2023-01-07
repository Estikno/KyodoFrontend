import React, { useEffect } from "react";

//interface
import IProfileTab from "../../interfaces/profile/IProfileTab";

//mantine
import { Space, Image, Box, Title, Container, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BiUser, BiDoorOpen, BiShield, BiBlock } from "react-icons/bi";
import { BsTools } from "react-icons/bs";

function SideBar({
    username,
    avatarUrl,
    setProfileTab,
    profileInitialState,
}: {
    username: string;
    avatarUrl: string;
    setProfileTab: React.Dispatch<React.SetStateAction<IProfileTab>>;
    profileInitialState: IProfileTab;
}) {
    const lesstThan876px = useMediaQuery(`(max-width: 876px)`);
    const lessThan768px = useMediaQuery(`(max-width: 768px)`);

    useEffect(() => {
        setProfileTab({ ...profileInitialState, ["profile"]: true });
    }, []);
    return (
        <>
            <Container style={{ width: "100%", height: "100%" }}>
                <Box
                    style={{
                        width: "100%",
                        height: "45%",
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <Image
                        src={avatarUrl}
                        width={lesstThan876px ? 140 : 200}
                        height={lesstThan876px ? 140 : 200}
                        alt="Avatar"
                        style={{ margin: "auto", paddingTop: lessThan768px ? "0" : "1.5rem"}}
                    />

                    <Space h="xs" />

                    <Title order={lesstThan876px ? 3 : 2} style={{paddingTop: lessThan768px ? "0" : "1.5rem"}}>{username}</Title>
                </Box>
                <Box
                    style={{
                        width: "100%",
                        height: "55%",
                        color: "white",
                    }}
                >
                    <Space h="md" />
                    <Tabs
                        radius="md"
                        orientation="vertical"
                        defaultValue="Profile"
                        style={{ width: "100%", height: "90%" }}
                    >
                        <Tabs.List
                            grow
                            position="center"
                            style={{ width: "100%" }}
                        >
                            <Tabs.Tab
                                value="Profile"
                                icon={<BiUser />}
                                onClick={() => {
                                    setProfileTab({
                                        ...profileInitialState,
                                        ["profile"]: true,
                                    });
                                }}
                            >
                                Profile
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="Password"
                                icon={<BiShield />}
                                onClick={() => {
                                    setProfileTab({
                                        ...profileInitialState,
                                        ["password"]: true,
                                    });
                                }}
                            >
                                Password
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="Sensive"
                                icon={<BsTools />}
                                onClick={() => {
                                    setProfileTab({
                                        ...profileInitialState,
                                        ["sensive"]: true,
                                    });
                                }}
                            >
                                Sensive Options
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="BlockedUsers"
                                icon={<BiBlock />}
                                onClick={() => {
                                    setProfileTab({
                                        ...profileInitialState,
                                        ["blockedUsers"]: true,
                                    });
                                }}
                            >
                                Blocked Users
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="SignOut"
                                icon={<BiDoorOpen />}
                                onClick={() => {
                                    setProfileTab({
                                        ...profileInitialState,
                                        ["signOut"]: true,
                                    });
                                }}
                            >
                                Sign Out
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Box>
            </Container>
        </>
    );
}

export default SideBar;
