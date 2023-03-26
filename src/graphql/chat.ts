import { gql } from "@apollo/client";

export const verifiedUser = gql`
    query ($token: String!) {
        verifiedUser(token: $token) {
            message
            status
            user {
                verified
                avatarUrl
                username
                email
            }
        }
    }
`;

export const getAllUsers = gql`
    query ($token: String!) {
        getUsers(token: $token) {
            status
            message
            user {
                verified
                avatarUrl
                username
                email
                idRoom
            }
        }
    }
`;

export const updateUser = gql`
    mutation ($token: String!, $updateUser: UpdateUser!) {
        updateUser(token: $token, updateUser: $updateUser) {
            message
            status
        }
    }
`;

export interface IGetVUsers {
    message: string;
    status: boolean;
    user: IUser[];
}

export interface IUser {
    verified: boolean;
    avatarUrl: string;
    username: string;
    email: string;
    idRoom: string;
}

export interface IUpdateUser {
    message: string;
    status: boolean;
}