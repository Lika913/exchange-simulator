import { Instrument } from "../../order/instrument";
import { Position } from "../../position";

export interface IPositionUpdateDataMessage {
    positionsData: Record<Instrument, Position>
}