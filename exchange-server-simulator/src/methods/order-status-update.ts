import { WebSocket } from "ws"
import { MESSAGE_TO_CLIENT } from "../constants/message-to-client"
import { IMessage } from "../types/message"
import { IOrder } from "../types/order"

export const OrderStatusUpdate = (order: IOrder, wsClient: WebSocket) => {
    const message: IMessage = {
        messageType: MESSAGE_TO_CLIENT.OrderStatusUpdate,
        message: { id: order.id, status: order.status },
    }
    wsClient.send(JSON.stringify(message))
}