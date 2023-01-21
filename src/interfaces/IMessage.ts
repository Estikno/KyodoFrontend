export default interface IMessage {
    message: string;
    fromSelf: boolean;
    username: string;
}

export interface IRecieveMessage {
    username: string;
    message: string;
}
