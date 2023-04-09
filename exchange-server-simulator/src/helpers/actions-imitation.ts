import { WebSocket, WebSocketServer } from "ws"
import { MarketDataUpdate } from "../methods/market-update-data"
import { ISubscription } from "../types/subscription"
import { orders } from "../data/orders"
import { Status } from "../types/status"
import { ExecutionReport } from "../methods/execution-report"

export const ImitatePricesChange = (
    subscriptions: ISubscription[],
    wsClient: WebSocket) => {

    return setInterval(() => {
        for (const subscription of subscriptions) {
            MarketDataUpdate(subscription, wsClient)
        }
    }, 3000)
}

export const ImitateChangeStatus = (wsServer: WebSocketServer) => {
    setInterval(() => {
        const suitableOrders = orders.find(order => order.status === 'Active')
        if (!suitableOrders) return

        const stauses: Status[] =[
            "Filled",
            "Rejected"
        ]
        const randomIndexStatus = Math.round(Math.random())
        suitableOrders.status = stauses[randomIndexStatus];
 
        wsServer.clients.forEach((wsClient: WebSocket) => {
            ExecutionReport(wsClient)
        })
    }, 10000)
}