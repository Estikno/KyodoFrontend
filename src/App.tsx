import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { RequireAuth } from "react-auth-kit";

//pages
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EmailConfirm from "./pages/EmailConfirm";

/**
 * Imports the components that will be used in the application and renders them
 * * Impotant to only render the route element, for example: <Route path="/" component={App} />
 * * The path is the route that the component will be rendered to
 */
export default function App() {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: "dark" }}
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
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
