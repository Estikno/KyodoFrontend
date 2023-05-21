import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "react-auth-kit";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {apiRoute} from "./utils/configs";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
    uri: `${apiRoute}/graphql`, //"http://localhost:4758/graphql",
    cache: new InMemoryCache(),
});

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AuthProvider
                authType={"cookie"}
                authName={"_auth"}
                cookieDomain={window.location.hostname}
                cookieSecure={false}
            >
                <App />
            </AuthProvider>
        </ApolloProvider>
    </React.StrictMode>
);
