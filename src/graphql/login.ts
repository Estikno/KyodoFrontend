import { gql } from "@apollo/client";

export const login = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            message
            status
            token
        }
    }
`;

export interface ILogin {
    message: string;
    status: boolean;
    token: string;
}
