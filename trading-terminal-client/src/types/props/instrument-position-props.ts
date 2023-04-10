import { Instrument } from "../order/instrument";
import { Side } from "../order/side";

export interface IInstrumentPositionProps {
    instrument: Instrument
    prices: Record<Side, number>
}