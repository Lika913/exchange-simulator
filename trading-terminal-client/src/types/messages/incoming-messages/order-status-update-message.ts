import { Status } from "../../order/status";

export interface IOrderStatusUpdateMessage {
    id: number
    status: Status
}