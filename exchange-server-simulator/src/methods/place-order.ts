import { orders } from "../data/orders";
import { WebSocket, WebSocketServer } from 'ws';
import { ExecutionReport } from "./execution-report";
import { IPlaceOrderMessage } from "../types/incoming-messages/place-order-message";
import { GenerateOrderId } from "../helpers/generators";

export const PlaceOrder = (data: IPlaceOrderMessage, wsServer: WebSocketServer) => {
    const { order } = data;

    const now = new Date();
    order.id = GenerateOrderId();
    order.creationTime = now;
    order.changeTime = now;
    order.status = "Active";

    orders.unshift(data.order)

    wsServer.clients.forEach((wsClient: WebSocket) => {
        ExecutionReport(wsClient)
    })
}