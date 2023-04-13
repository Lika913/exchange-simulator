import { MESSAGE_TO_SERVER } from "../constants/message-to-server";
import { MESSAGE_FROM_SERVER } from "../constants/message-from-server";
import { IMessage } from "../types/messages/message";
import { IOrder } from "../types/order/order";
import { IMarketDataUpdateMessage } from "../types/messages/incoming-messages/market-data-update-message";
import { IExecutionReportMessage } from "../types/messages/incoming-messages/execution-report-message";
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
import { CONNECTION_URL } from "../constants/url";
import { showErrorNotification, showSuccessNotification } from "./notification-helper";
import { IOrderStatusUpdateMessage } from "../types/messages/incoming-messages/order-status-update-message";
import { Status } from "../types/order/status";

export const createWebsocketClient = (
    onMarketDataUpdate: (x: Record<Side, number>) => void,
    onSuccessInfo: (x: string) => void,
    onExecutionReport: (x: IOrder[]) => void,
    onPositionUpdateData: (x: Record<Instrument, Position>) => void,
): IWebsocketClient => {

    const ws = new WebSocket(CONNECTION_URL);

    ws.onmessage = msg => {
        const data = JSON.parse(msg.data) as IMessage;

        switch (data.messageType) {
            case MESSAGE_FROM_SERVER.MarketDataUpdate:
                const marketDataUpdateMessage = data.message as IMarketDataUpdateMessage;
                onMarketDataUpdate(marketDataUpdateMessage.prices);
                break;
            case MESSAGE_FROM_SERVER.SuccessInfo:
                const successInfoMessage = data.message as ISuccessInfoMessage;
                onSuccessInfo(successInfoMessage.subscriptionId);
                break;
            case MESSAGE_FROM_SERVER.ErrorInfo:
                const errorInfoMessage = data.message as IErrorInfoMessage;
                showErrorNotification(errorInfoMessage.reason);
                break;
            case MESSAGE_FROM_SERVER.ExecutionReport:
                const reportMessage = data.message as IExecutionReportMessage;
                onExecutionReport(reportMessage.orders);
                break;
            case MESSAGE_FROM_SERVER.PositionUpdateData:
                const positionUpdateDataMessage = data.message as IPositionUpdateDataMessage;
                onPositionUpdateData(positionUpdateDataMessage.positionsData);
                break;
            case MESSAGE_FROM_SERVER.OrderStatusUpdate:
                const orderStatusUpdateMessage = data.message as IOrderStatusUpdateMessage;
                showSuccessNotification(
                    `\u{2757} У заявки ${orderStatusUpdateMessage.id} ` +
                    `изменился статус на '${orderStatusUpdateMessage.status}'`
                );
                break;
        }
    }

    ws.onerror = () => {
        showErrorNotification("Ошибка соединения. Пожалуйста, убедитесь, что сервер запущен.");
    }

    const send = (message: IMessage): boolean => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(message))
            return true;
        } else {
            showErrorNotification("Соединение с сервером не установлено")
            return false;
        }
    }

    const subscribeMarketData = (instrument: Instrument): boolean => {
        const message: IMessage<ISubscribeMarketDataMessage> = {
            messageType: MESSAGE_TO_SERVER.SubscribeMarketData,
            message: { instrument }
        }
        return send(message);
    }

    const unsubscribeMarketData = (subscriptionId: string): boolean => {
        const message: IMessage<IUnsubscribeMarketDataMessage> = {
            messageType: MESSAGE_TO_SERVER.UnsubscribeMarketData,
            message: { subscriptionId }
        }
        return send(message);
    }

    const placeOrder = (order: IOrder): boolean => {
        const message: IMessage<IPlaceOrderMessage> = {
            messageType: MESSAGE_TO_SERVER.PlaceOrder,
            message: { order }
        }
        return send(message)
    }

    const cancelOrder = (orderId: number): boolean => {
        const message: IMessage<ICancelOrderMessage> = {
            messageType: MESSAGE_TO_SERVER.CancelOrder,
            message: { orderId }
        }
        return send(message)
    }

    const closeConnection = () => {
        if (ws.readyState === ws.OPEN) {
            ws.close();
        }
    }

    return {
        subscribeMarketData,
        unsubscribeMarketData,
        placeOrder,
        cancelOrder,
        closeConnection
    }
}
