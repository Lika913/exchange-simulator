import { IOrder } from "./order/order";

export interface IWebsocketClient {
    subscribeMarketData: (instrument: number) => void
    unsubscribeMarketData: (subscriptionId: string) => void
    placeOrder: (order: IOrder) => void
    cancelOrder: (orderId: number) => void
}