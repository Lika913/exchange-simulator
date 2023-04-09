import { Instrument } from "../order/instrument";

export interface ITradingInstrumentProps {
    instrument: Instrument | "",
    setInstrument: React.Dispatch<React.SetStateAction<Instrument | "">>
}

