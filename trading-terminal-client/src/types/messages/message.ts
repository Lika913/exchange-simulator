export interface IMessage<T = object> {
    messageType: number
    message?: T
}
