import React from "react";
import { Link } from "react-router-dom";

import {
    Group,
    Anchor,
    Image,
    Text,
    Title,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function NavLogo({ Logo }: { Logo: string }) {
    const lessThan500px = useMediaQuery(`(max-width: 500px)`);
    const lessThan1280px = useMediaQuery(`(max-width: 12080px)`);

    //mantine
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    const theme = useMantineTheme();

    return (
        <Group
            style={{
                marginLeft: "1rem",
                marginRight: "1rem",
            }}
        >
            <Anchor component={Link} to="/">
                <Image
                    src={Logo}
                    withPlaceholder
                    placeholder={<Text align="center">Logo</Text>}
                    width={lessThan500px ? 30 : 30}
                />
            </Anchor>
            <Title
                order={lessThan1280px ? 3 : 2}
                color={dark ? theme.colors.dark[7] : theme.colors.gray[7]}
            >
                Kyodo
            </Title>
        </Group>
    );
}

export default NavLogo;
