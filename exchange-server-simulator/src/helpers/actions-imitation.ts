import { WebSocket, WebSocketServer } from "ws"
import { MarketDataUpdate } from "../methods/market-update-data"
import { ISubscription } from "../types/subscription"
import { orders } from "../data/orders"
import { Status } from "../types/status"
import { ExecutionReport } from "../methods/execution-report"
import { GeneratePrices } from "./generators"
import { PositionUpdateData } from "../methods/position-update-data"

export const ImitatePricesChange = (
    subscriptions: ISubscription[],
    wsClient: WebSocket) => {

    return setInterval(() => {
        for (const subscription of subscriptions) {
            const prices = GeneratePrices(subscription.instrument)
            MarketDataUpdate(subscription.subscriptionId, prices, wsClient)
        }
    }, 3000)
}

export const ImitateFulfillmentOrder = (wsServer: WebSocketServer) => {
    setInterval(() => {
        const order = orders.find(order => order.status === 'Active')
        if (!order) return

        order.status = "Filled";
        order.change_time = new Date();
 
        wsServer.clients.forEach((wsClient: WebSocket) => {
            ExecutionReport(wsClient);
            PositionUpdateData(wsClient);
        })
    }, 10000)
}