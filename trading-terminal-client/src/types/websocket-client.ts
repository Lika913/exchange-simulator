import { Instrument } from "./order/instrument";
import { IOrder } from "./order/order";

export interface IWebsocketClient {
    subscribeMarketData: (instrument: Instrument) => boolean
    unsubscribeMarketData: (subscriptionId: string) => boolean
    placeOrder: (order: IOrder) => boolean
    cancelOrder: (orderId: number) => boolean
    closeConnection: () => void
}