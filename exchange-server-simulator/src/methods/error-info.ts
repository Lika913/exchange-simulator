import { WebSocket } from "ws";
import { MESSAGE_TO_CLIENT } from "../constants/message-to-client";
import { IMessage } from "../types/message";

export const ErrorInfo = (reason: string, wsClient: WebSocket) => {
    const errorMessage: IMessage = {
        messageType: MESSAGE_TO_CLIENT.ErrorInfo,
        message: { reason }
    }
    wsClient.send(JSON.stringify(errorMessage));
}