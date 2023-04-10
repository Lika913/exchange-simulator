import { WebSocket } from 'ws';
import { ISubscribeMarketDataMessage } from '../types/incoming-messages/subscribe-market-data-message'
import { v4 as generateUuid } from 'uuid';
import { ISubscription } from "../types/subscription";
import { MarketDataUpdate } from './market-update-data';
import { SuccessInfo } from './success-info';
import { ErrorInfo } from './error-info';
import { GeneratePrices } from '../helpers/generators';

export const SubscribeMarketData = (
    data: ISubscribeMarketDataMessage, 
    subscriptions: ISubscription[],
    wsClient: WebSocket) => {
 
    try {
        const subscription: ISubscription = { 
            subscriptionId: generateUuid(), 
            instrument: data.instrument
        };

        subscriptions.push(subscription);

        const prices = GeneratePrices(subscription.instrument)
        MarketDataUpdate(subscription.subscriptionId, prices, wsClient);
        SuccessInfo(subscription.subscriptionId, wsClient);
    } catch (err) {
        ErrorInfo((err as Error)?.message, wsClient);      
    }
}
