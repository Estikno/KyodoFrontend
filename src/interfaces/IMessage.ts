export default interface IMessage {
    message: string;
    fromSelf: boolean;
}

export interface IRecieveMessage {
    username: string;
    message: string;
}
