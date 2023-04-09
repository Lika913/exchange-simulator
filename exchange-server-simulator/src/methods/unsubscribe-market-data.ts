import { WebSocket } from 'ws';
import { ISubscription } from "../types/subscription";
import { IUnsubscribeMarketDataMessage } from '../types/incoming-messages/unsubscribe-market-data-message';

export const UnsubscribeMarketData = (
    data: IUnsubscribeMarketDataMessage, 
    subscriptions: ISubscription[],
    wsClient: WebSocket) => {
    
    const index = subscriptions.findIndex(subscription => 
        subscription.subscriptionId === data.subscriptionId
    )
    subscriptions.splice(index, 1)
}