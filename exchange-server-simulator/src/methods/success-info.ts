import { WebSocket } from "ws";
import { MESSAGE_TO_CLIENT } from "../constants/message-to-client";
import { IMessage } from "../types/message";

export const SuccessInfo = (subscriptionId: string, wsClient: WebSocket) => {
    const successMessage: IMessage = {
        messageType: MESSAGE_TO_CLIENT.SuccessInfo,
        message: { subscriptionId }
    }
    wsClient.send(JSON.stringify(successMessage));
}