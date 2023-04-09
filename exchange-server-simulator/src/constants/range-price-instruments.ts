import { Instrument } from "../types/instrument"
import { Range } from "../types/range"

export const RANGE_PRICE_INSTRUMENTS: Record<Instrument, Range> = {
    eur_usd: { min: 1, max: 2 },
    eur_rub: { min: 70, max: 80 },
    usd_rub: { min: 80, max: 90 },
}