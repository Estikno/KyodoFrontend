import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from "@mantine/core";
import { RequireAuth } from "react-auth-kit";

//pages
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EmailConfirm from "./pages/EmailConfirm";
import Error404 from './pages/Error404';

/**
 * Imports the components that will be used in the application and renders them
 * * Impotant to only render the route element, for example: <Route path="/" component={App} />
 * * The path is the route that the component will be rendered to
 */
export default function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: colorScheme,
                    colors: {
                        dark: [
                            "#36404A",
                            "#303841",
                            "#262E35",
                            "#3E4A56",
                            "#7269EF",
                            "#2F3741",
                            "#A6B0CF",
                            "#E1E9F1",
                            "#050607",
                            "#1A2D3F",
                        ],
                        gray: [
                            "#FFFFFF",
                            "#F5F7FB",
                            "#FFFFFF",
                            "#F7F7FF",
                            "#7269EF",
                            "#ECEDF6",
                            "#878A92",
                            "#495057",
                            "#191919",
                            "#1A2D3F",
                        ]
                    },
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth loginPath="/login">
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <RequireAuth loginPath="/login">
                                    <Chat />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/email-confirm/:token"
                            element={<EmailConfirm />}
                        />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </BrowserRouter>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
