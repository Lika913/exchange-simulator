import { Instrument } from "./order/instrument"
import { IOrder } from "./order/order"
import { Side } from "./order/side"
import { Position } from "./position"

export interface IGlobalState {
    prices: Record<Side, number>,
    positions: Record<Instrument, Position>,
    subscriptionId: string
    orders: IOrder[]
}