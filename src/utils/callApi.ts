import axios from "axios";
import * as apiRoutes from "./apiRoutes";
import { IAuthResponse } from "../interfaces/IApiResponses";

/**
 * Call the backend API for authentication to register a new user.
 * Returns an object with the status and user data.
 */
export async function callRegister(username: string, email: string, password: string): Promise<IAuthResponse> {
    const { data } = await axios.post(apiRoutes.registerRoute, {
        username,
        password,
        email,
    });

    return data;
}

/**
 * Similar to callRegister, but for authentication to the login route.
 * Returns an object with the status and user data.
 */
export async function callLogin(username: string, password: string): Promise<IAuthResponse> {
    const { data } = await axios.post(apiRoutes.loginRoute, {
        username,
        password
    });

    return data;
}

export async function changeAvatar(file: File, token: string): Promise<IAuthResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const {data} = await axios.post(apiRoutes.changeAvatarRoute, formData, {headers: {'Content-Type': 'multipart/form-data', token: token}});
    return data;
}

export async function removeAvatar(token: string): Promise<IAuthResponse> {
    const { data } = await axios.delete(apiRoutes.changeAvatarRoute, {headers: {token: token}});
    return data;
}

export async function changePassword(newPassword: string, oldPassword: string, token: string): Promise<IAuthResponse> {
    const {data} = await axios.put(apiRoutes.changePasswordRoute, {oldPassword, newPassword}, {headers: {token: token}});
    return data;
}

export async function getUserInfo(token: string): Promise<IAuthResponse> {
    const {data} = await axios.get(apiRoutes.getUserRoute, {headers: {token: token}});
    return data;
}

export async function getAllUsers(token: string): Promise<IAuthResponse> {
    const { data } = await axios.get(apiRoutes.getUsers, {headers: {token: token}});
    return data;
}

export async function updateUser(token: string, updateInfo: object): Promise<IAuthResponse> {
    const {data} = await axios.put(apiRoutes.updateUser, {updateInfo: updateInfo}, {headers: {token: token}});
    return data;
}

export async function deleteUser(token: string): Promise<IAuthResponse> {
    await removeAvatar(token);
    const {data} = await axios.delete(apiRoutes.deleteUser, {headers: {token: token}});
    return data;
}

export async function getRoom(token: string, frienUsername: string): Promise<IAuthResponse> {
    const { data } = await axios.post(apiRoutes.getRoom, {ofu: frienUsername}, {headers: {token: token}});
    return data;
}

export async function emailVerification(token: string): Promise<IAuthResponse> {
    const { data } = await axios.get(`${apiRoutes.emailVerification}/${token}`);
    return data;
}