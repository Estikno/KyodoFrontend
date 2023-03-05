import { gql } from "@apollo/client";

export const register = gql`
    mutation ($username: String!, $password: String!, $email: String!) {
        register(username: $username, password: $password, email: $email) {
            message
            status
            token
        }
    }
`;

export interface IRegister{
    message: string;
    status: boolean;
    token: string;
}