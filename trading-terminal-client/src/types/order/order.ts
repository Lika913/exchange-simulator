import { Instrument } from "./instrument"
import { Side } from "./side"
import { Status } from "./status"

export interface IOrder {
    id?: number
    creation_time: Date
    change_time: Date
    status: Status
    side: Side
    price: number
    amount: number
    instrument: Instrument
}