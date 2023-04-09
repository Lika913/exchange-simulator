import { IOrder } from "./order/order"
import { Side } from "./order/side"

export interface IGlobalState {
    prices: Record<Side, number>
    subscriptionId: string
    orders: IOrder[]
}