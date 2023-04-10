import { MESSAGE_TO_SERVER } from "../constants/message-to-server";
import { MESSAGE_FROM_SERVER } from "../constants/message-from-server";
import { IMessage } from "../types/messages/message";
import { IOrder } from "../types/order/order";
import { IMarketDataUpdateMessage } from "../types/messages/incoming-messages/market-data-update-message";
import { IReportMessage } from "../types/messages/incoming-messages/report-message";
import { ISuccessInfoMessage } from "../types/messages/incoming-messages/success-info-message";
import { ISubscribeMarketDataMessage } from "../types/messages/outgoing-messages/subscribe-market-data-message";
import { IUnsubscribeMarketDataMessage } from "../types/messages/outgoing-messages/unsubscribe-market-data-message";
import { IPlaceOrderMessage } from "../types/messages/outgoing-messages/place-order-message";
import { ICancelOrderMessage } from "../types/messages/outgoing-messages/cancel-order-message";
import { IWebsocketClient } from "../types/websocket-client";
import { IErrorInfoMessage } from "../types/messages/incoming-messages/error-info-message";
import { Side } from "../types/order/side";
import { IPositionUpdateDataMessage } from "../types/messages/incoming-messages/position-update-data-message";
import { Instrument } from "../types/order/instrument";
import { Position } from "../types/position";

export const createWebsocketClient = (
    setPrices: React.Dispatch<React.SetStateAction<Record<Side, number>>>,
    setSubscriptionId: React.Dispatch<React.SetStateAction<string>>,
    setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>,
    setPositions: React.Dispatch<React.SetStateAction<Record<Instrument, Position>>>,
    ): IWebsocketClient => {

    const ws = new WebSocket("ws://localhost:9000");

    ws.onmessage = msg => {
        const data = JSON.parse(msg.data) as IMessage<object>;

        switch (data.messageType) {
            case MESSAGE_FROM_SERVER.MarketDataUpdate:
                const marketDataUpdateMessage = data.message as IMarketDataUpdateMessage;
                setPrices(marketDataUpdateMessage.prices)
                break;
            case MESSAGE_FROM_SERVER.SuccessInfo:
                const successInfoMessage = data.message as ISuccessInfoMessage;
                setSubscriptionId(successInfoMessage.subscriptionId);
                break;
            case MESSAGE_FROM_SERVER.ErrorInfo:
                const errorInfoMessage = data.message as IErrorInfoMessage;
                alert(errorInfoMessage.reason);
                break;
            case MESSAGE_FROM_SERVER.ExecutionReport:
                const reportMessage = data.message as IReportMessage;
                setOrders(reportMessage.orders);
                break;
            case MESSAGE_FROM_SERVER.PositionUpdateData:
                const positionUpdateDataMessage = data.message as IPositionUpdateDataMessage;
                setPositions(positionUpdateDataMessage.positionsData)
                break;
        }
    }

    const send = (message: IMessage<object>) => {
        ws.send(JSON.stringify(message))
    }

    const subscribeMarketData = (instrument: number) => {
        const message: IMessage<ISubscribeMarketDataMessage> = {
            messageType: MESSAGE_TO_SERVER.SubscribeMarketData,
            message: { instrument }
        }
        send(message)
    }

    const unsubscribeMarketData = (subscriptionId: string) => {
        const message: IMessage<IUnsubscribeMarketDataMessage> = {
            messageType: MESSAGE_TO_SERVER.UnsubscribeMarketData,
            message: { subscriptionId }
        }
        send(message)
    }

    const placeOrder = (order: IOrder) => {
        const message: IMessage<IPlaceOrderMessage> = {
            messageType: MESSAGE_TO_SERVER.PlaceOrder,
            message: { order }
        }
        send(message)
    }

    const cancelOrder = (orderId: number) => {
        const message: IMessage<ICancelOrderMessage> = {
            messageType: MESSAGE_TO_SERVER.CancelOrder,
            message: { orderId }
        }
        send(message)
    }

    return {
        subscribeMarketData,
        unsubscribeMarketData,
        placeOrder,
        cancelOrder
    }
}
