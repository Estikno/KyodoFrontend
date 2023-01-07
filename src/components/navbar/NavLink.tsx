import React from "react";
import { Link } from "react-router-dom";
import { Group, Anchor, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function NavLink({ name, to }: { name: string, to: string}) {
    const lessThan768px = useMediaQuery(`(max-width: 768px)`);

    return (
        <Group position="center" style={{ width: lessThan768px ? "100%" : "auto"}}>
            <Anchor
                component={Link}
                to={to}
                style={{ color: "#fff", textDecoration: "none", width: "100%"}}
                align="center"
            >
                {lessThan768px ? (
                    <Text size="xl" weight={700}>{name}</Text>
                ) : (
                    <Text size="lg">{name}</Text>
                )}
            </Anchor>
        </Group>
    );
}

export default NavLink;
