import React from "react";
import { render } from "@testing-library/react";
import App from "./app";
import { ContextProvider } from "../context-provider/context-provider";

let container: HTMLElement;

beforeEach(() => {
    ({ container } = render(
        <ContextProvider>
            <App />
        </ContextProvider>));
});

describe("App component", () => {
    it("should render one Ticker component", () => {
        const ticker = container.getElementsByClassName("ticker")
        expect(ticker.length).toEqual(1)
    });

    it("should render one Designation component", () => {
        const designation = container.getElementsByClassName("designation")
        expect(designation.length).toEqual(1)
    });

    it("should render one PositionScoreboard component", () => {
        const position_scoreboard = container.getElementsByClassName("position-scoreboard")
        expect(position_scoreboard.length).toEqual(1)
    });

    it("should render one OrderList component", () => {
        const order_list = container.getElementsByClassName("order-list")
        expect(order_list.length).toEqual(1)
    });
})