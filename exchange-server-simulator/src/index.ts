import { WebSocketServer, WebSocket } from 'ws';
import { MESSAGE_FROM_CLIENT } from './constants/message-from-client';
import { SubscribeMarketData } from './methods/subscribe-market-data';
import { UnsubscribeMarketData } from './methods/unsubscribe-market-data';
import { IMessage } from './types/message';
import { ISubscribeMarketDataMessage } from './types/incoming-messages/subscribe-market-data-message';
import { ISubscription } from './types/subscription';
import { IUnsubscribeMarketDataMessage } from './types/incoming-messages/unsubscribe-market-data-message';
import { ExecutionReport } from './methods/execution-report';
import { PlaceOrder } from './methods/place-order';
import { CancelOrder } from './methods/cancel-order';
import { ICancelOrderMessage } from './types/incoming-messages/cancel-order-message';
import { IPlaceOrderMessage } from './types/incoming-messages/place-order-message';
import { ImitateFulfillmentOrder, ImitatePricesChange } from './helpers/actions-imitation';
import { PositionUpdateData } from './methods/position-update-data';

const wsServer: WebSocketServer = new WebSocketServer({ port: 9000 });

wsServer.on('connection', (wsClient: WebSocket) => {

    ExecutionReport(wsClient);
    PositionUpdateData(wsClient);

    const subscriptions: ISubscription[] = []
   
    wsClient.on('message', (message: string) => {
        const messageData: IMessage = JSON.parse(message)

        switch (messageData.messageType) {
            case MESSAGE_FROM_CLIENT.SubscribeMarketData:
                SubscribeMarketData(messageData.message as ISubscribeMarketDataMessage, subscriptions, wsClient);
                break;
            case MESSAGE_FROM_CLIENT.UnsubscribeMarketData:
                UnsubscribeMarketData(messageData.message as IUnsubscribeMarketDataMessage, subscriptions, wsClient);
                break;
            case MESSAGE_FROM_CLIENT.PlaceOrder:
                PlaceOrder(messageData.message as IPlaceOrderMessage, wsServer);
                break;
            case MESSAGE_FROM_CLIENT.CancelOrder:
                CancelOrder(messageData.message as ICancelOrderMessage, wsServer);
                break;
        }
    })

    wsClient.on("close", () => {
        clearInterval(intervalId)
    })

    const intervalId = ImitatePricesChange(subscriptions, wsClient)
});

ImitateFulfillmentOrder(wsServer)
