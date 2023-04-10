import { RANGE_PRICE_INSTRUMENTS } from "../constants/range-price-instruments";
import { orders } from "../data/orders";
import { Instrument } from "../types/instrument";
import { Side } from "../types/side";

export const GeneratePrices = (instrument: Instrument): Record<Side, number> => {
    const range = RANGE_PRICE_INSTRUMENTS[instrument]
    const randomPrice = range.min + Math.random() * (range.max - range.min);
    const priceSell = Number(randomPrice.toFixed(3));
    const priceBuy = Number((randomPrice - randomPrice * 0.05).toFixed(3));

    return {
        Sell: priceSell,
        Buy: priceBuy,
    }
}

export const GenerateOrderId = (): number => {
    return orders.length + 1
}