export default interface IMessage {
    message: string;
    fromSelf: boolean;
    username: string;
    id_room: string;
}

export interface IRecieveMessage {
    username: string;
    message: string;
    id_room: string;
}

export interface ISendMessage {
    person: string;
    message: string;
    username_to: string;
    id_room: string;
}
