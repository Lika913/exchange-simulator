import { WebSocket } from "ws";
import { IMessage } from "../types/message";
import { MESSAGE_TO_CLIENT } from "../constants/message-to-client";
import { orders } from "../data/orders";
import { Instrument } from "../types/instrument";
import { Position } from "../types/position";

export const PositionUpdateData = (wsClient: WebSocket) => {

    const positionsData: Record<Instrument, Position> = {
        eur_rub: sumCalculation("eur_rub"),
        eur_usd: sumCalculation("eur_usd"),
        usd_rub: sumCalculation("usd_rub"),
    }

    const message: IMessage = {
        messageType: MESSAGE_TO_CLIENT.PositionUpdateData,
        message: { positionsData }
    }
    wsClient.send(JSON.stringify(message))

}

const sumCalculation = (instrument: Instrument): Position => {
    const suitableOrders = orders.filter(order =>
        order.status === "Filled" &&
        order.instrument === instrument
    )

    let sumBuy = 0
    let sumSell = 0

    suitableOrders.forEach(order => {
        if (order.side === "Buy") {
            sumBuy += order.price
        } else {
            sumSell += order.price
        }
    })

    return {
        Buy: Number(sumBuy.toFixed(3)),
        Sell:  Number(sumSell.toFixed(3))
    }
}
