import { WebSocket } from 'ws';
import { ISubscription } from "../types/subscription";
import { IUnsubscribeMarketDataMessage } from '../types/incoming-messages/unsubscribe-market-data-message';
import { MarketDataUpdate } from './market-update-data';

export const UnsubscribeMarketData = (
    data: IUnsubscribeMarketDataMessage,
    subscriptions: ISubscription[],
    wsClient: WebSocket) => {

    const index = subscriptions.findIndex(subscription =>
        subscription.subscriptionId === data.subscriptionId
    )
    subscriptions.splice(index, 1)

    MarketDataUpdate(data.subscriptionId, { Buy: 0, Sell: 0 }, wsClient)
}