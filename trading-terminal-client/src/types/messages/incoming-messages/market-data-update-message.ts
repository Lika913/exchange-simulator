export interface IMarketDataUpdateMessage {
    subscriptionId: string,
    priceSell: number,
    priceBuy: number,
}