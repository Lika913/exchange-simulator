import { Instrument } from "../types/instrument"
import { Range } from "../types/range"

export const RANGE_PRICE_INSTRUMENTS: Record<Instrument, Range> = {
    eur_usd: { min: 1, max: 2 },
    eur_rub: { min: 3, max: 4 },
    usd_rub: { min: 5, max: 6 },
}