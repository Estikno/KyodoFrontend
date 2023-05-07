export interface IAuthResponse {
    message: string;
    status: boolean;
    token?: string;
    user?: IUserInfo | IUserInfo[];
    room?: string;
}

export interface IUserInfo {
    username: string;
    email: string;
    avatarUrl: string;
    verified: boolean;
    idRoom: string;
}