import { WebSocket, WebSocketServer } from "ws";
import { orders } from "../data/orders";
import { ExecutionReport } from "./execution-report";
import { ICancelOrderMessage } from "../types/incoming-messages/cancel-order-message";

export const CancelOrder = (data: ICancelOrderMessage, wsServer: WebSocketServer) => {
    const order = orders.find(order => order.id === data.orderId)
    if (!order) return;

    order.status = "Cancelled"   
    order.change_time = new Date(); 

    wsServer.clients.forEach((wsClient: WebSocket) => {
        ExecutionReport(wsClient)    
    })    
}