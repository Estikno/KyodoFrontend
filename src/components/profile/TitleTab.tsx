import React from "react";

//mantine
import { Space, Title, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function TitleTab({title}: {title: string}) {
    const lessThan876px = useMediaQuery(`(max-width: 876px)`);

    return (
        <>
            <Title order={lessThan876px ? 2 : 1}>{title}</Title>
            <Space h="sm" />
            <Divider
                size="sm"
                style={{
                    width: "100%",
                    marginTop: "4px",
                    marginBottom: "4px",
                }}
            />
            <Space h="lg" />
        </>
    );
}

export default TitleTab;
