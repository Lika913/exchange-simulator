import { MESSAGE_TO_CLIENT } from "../constants/message-to-client";
import { WebSocket } from 'ws';
import { IMessage } from "../types/message";
import { ISubscription } from "../types/subscription";
import { RANGE_PRICE_INSTRUMENTS } from "../constants/range-price-instruments";
import { Instrument } from "../types/instrument";

export const MarketDataUpdate = (
    subscription: ISubscription, 
    wsClient: WebSocket) => {

    const range = RANGE_PRICE_INSTRUMENTS[subscription.instrument]
    const randomPrice = range.min + Math.random() * (range.max - range.min);
    const priceSell = Number(randomPrice.toFixed(3));
    const priceBuy = Number((randomPrice - randomPrice * 0.05).toFixed(3));

    const message: IMessage = {
        messageType: MESSAGE_TO_CLIENT.MarketDataUpdate,
        message: {
            priceSell,
            priceBuy,
            subscriptionId: subscription.subscriptionId
        }
    }
    wsClient.send(JSON.stringify(message))
}