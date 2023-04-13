import React from "react";
import { render } from "@testing-library/react";
import InstrumentPosition from "./instrument-position";
import { INSTRUMENTS } from "../../../constants/instruments";
import { Instrument } from "../../../types/order/instrument";
import { Side } from "../../../types/order/side";

let container: HTMLElement;
const prices: Record<Side, number> = { Sell: 245.765, Buy: 300 };
const instrument: Instrument = "eur_usd";

beforeEach(() => {    
    ({ container } = render(
            <InstrumentPosition
                instrument={instrument}
                prices={prices}
            />));
});

describe("InstrumentPosition component", () => {
    it("should correctly display the header", () => {
        const title = container.getElementsByClassName("title");

        expect(title.length).toEqual(1);
        expect(title.item(0)?.innerHTML).toBe(INSTRUMENTS[instrument]);
    });

    it("should correctly display the prices", () => {
        const pricesElements = container.querySelectorAll(".cell");

        expect(pricesElements.item(0).innerHTML).toEqual(prices["Sell"].toString());
        expect(pricesElements.item(1).innerHTML).toEqual(prices["Buy"].toString());
    });

    it("should add '+' to the benefit if the value > 0", () => {
        const pricesElements = container.querySelectorAll(".cell");
        const benefit = Number((prices["Buy"] - prices["Sell"]).toFixed(3));

        expect(pricesElements.item(2).innerHTML).toEqual("+" + benefit)
    });
})
