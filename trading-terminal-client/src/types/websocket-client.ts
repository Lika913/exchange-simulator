import { Instrument } from "./order/instrument";
import { IOrder } from "./order/order";

export interface IWebsocketClient {
    subscribeMarketData: (instrument: Instrument) => void
    unsubscribeMarketData: (subscriptionId: string) => void
    placeOrder: (order: IOrder) => void
    cancelOrder: (orderId: number) => void
    closeConnection: () => void
}