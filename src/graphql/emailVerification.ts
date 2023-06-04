import { gql } from "@apollo/client";

export const emailVerification = gql`
    mutation ($token: String!) {
        verification(token: $token) {
            message
            status
        }
    }
`;

export interface IEmailVerification {
    message: string;
    status: boolean;
    token: string;
}
