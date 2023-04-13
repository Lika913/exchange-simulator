import { Instrument } from "../types/order/instrument";
import { IOrder } from "../types/order/order";
import { Position } from "../types/position";
import { MESSAGE_FROM_SERVER } from "./message-from-server";
import { MESSAGE_TO_SERVER } from "./message-to-server";

export const subscriptionId: string = "6F9619FF-8B86-D011-B42D-00CF4FC964FF"

export const messageUnsubscribeMarketData = {
    messageType: MESSAGE_TO_SERVER.UnsubscribeMarketData,
    message: { subscriptionId }
};

export const messageSubscribeMarketData = {
    messageType: MESSAGE_TO_SERVER.SubscribeMarketData,
    message: { instrument: "eur_usd" }
}

export const messageSuccessInfo = {
    messageType: MESSAGE_FROM_SERVER.SuccessInfo,
    message: { subscriptionId }
}

export const orderSell: IOrder = {
    side: "Sell",
    price: Number((545.6 * 6).toFixed(3)),
    amount: 6,
    instrument: "eur_usd",
}

export const orderBuy: IOrder = {
    side: "Buy",
    price: Number((70.12 * 6).toFixed(3)),
    amount: 6,
    instrument: "eur_usd",
}

export const positionsData: Record<Instrument, Position> = {
    eur_rub: { Buy: 321.4, Sell: 545.8 },
    eur_usd: { Buy: 70, Sell: 545 },
    usd_rub: { Buy: 220, Sell: 20 }
}

export const orders: IOrder[] = [
    {
        id: 3,
        creationTime: new Date("03-30-2023"),
        changeTime: new Date("03-30-2023"),
        status: "Filled",
        side: 'Buy',
        price: 34345.09,
        amount: 103,
        instrument: 'usd_rub'
    },
    {
        id: 2,
        creationTime: new Date("04-05-2023"),
        changeTime: new Date("06-05-2023"),
        status: 'Rejected',
        side: 'Sell',
        price: 65461.89,
        amount: 1000,
        instrument: 'eur_usd'
    },
    {
        id: 1,
        creationTime: new Date("04-01-2023"),
        changeTime: new Date("04-01-2023"),
        status: 'Active',
        side: 'Sell',
        price: 5.43,
        amount: 1,
        instrument: 'eur_usd'
    },
]