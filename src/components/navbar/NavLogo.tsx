import React from "react";
import { Link } from "react-router-dom";

import { Group, Anchor, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function NavLogo({ Logo }: { Logo: string }) {
    const lessThan500px = useMediaQuery(`(max-width: 500px)`);
    const lessThan1280px = useMediaQuery(`(max-width: 12080px)`);

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
                    height={lessThan500px ? 40 : 60}
                    width={lessThan500px ? 40 : 60}
                />
            </Anchor>
            <Title order={lessThan1280px ? 3 : 2}>Kyodo</Title>
        </Group>
    );
}

export default NavLogo;
