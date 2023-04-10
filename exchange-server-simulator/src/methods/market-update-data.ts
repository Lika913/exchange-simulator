import { MESSAGE_TO_CLIENT } from "../constants/message-to-client";
import { WebSocket } from 'ws';
import { IMessage } from "../types/message";
import { Side } from "../types/side";

export const MarketDataUpdate = (
    subscriptionId: string, 
    prices: Record<Side, number>,
    wsClient: WebSocket) => {
 
    const message: IMessage = {
        messageType: MESSAGE_TO_CLIENT.MarketDataUpdate,
        message: {
            prices,
            subscriptionId
        }
    }
    wsClient.send(JSON.stringify(message))
}