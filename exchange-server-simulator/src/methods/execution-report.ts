import { WebSocket } from 'ws';
import { IMessage } from '../types/message';
import { MESSAGE_TO_CLIENT } from '../constants/message-to-client';
import { orders } from '../data/orders';

export const ExecutionReport = (wsClient: WebSocket) => {
    const message: IMessage = {
        messageType: MESSAGE_TO_CLIENT.ExecutionReport,
        message: { orders }
    }
    wsClient.send(JSON.stringify(message))
}