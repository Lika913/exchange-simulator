import { Side } from "../../order/side";

export interface IMarketDataUpdateMessage {
    subscriptionId: string,
    prices: Record<Side, number>
}