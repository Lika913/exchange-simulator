import React from "react";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WS from "jest-websocket-mock";
import { MESSAGE_FROM_SERVER } from "../../constants/message-from-server";
import { CONNECTION_URL } from "../../constants/url";
import Ticker from "../../components/ticker/ticker";
import { ContextProvider } from "../../components/context-provider/context-provider";
import { act } from "react-dom/test-utils";
import { messageSubscribeMarketData, messageSuccessInfo, messageUnsubscribeMarketData, orderBuy, orderSell } from "../../constants/test-data";
import { MESSAGE_TO_SERVER } from "../../constants/message-to-server";

let serverWS: WS;
let container: HTMLElement;
const prices = { Buy: 70.12, Sell: 545.6 }

beforeEach(() => {
    serverWS = new WS(CONNECTION_URL, { jsonProtocol: true });

    ({ container } = render(
        <ContextProvider>
            <Ticker />
        </ContextProvider>));
});

afterEach(() => {
    WS.clean();
});

describe("Ticker component", () => {
    it("should render one TradingInstrument component", () => {
        const tradingInstrument = container.getElementsByClassName("trading-instrument")
        expect(tradingInstrument.length).toEqual(1)
    });

    it("should render one OrderAmount component", () => {
        const orderAmount = container.getElementsByClassName("order-amount")
        expect(orderAmount.length).toEqual(1)
    });

    it("should render two SideOrder component", () => {
        const ticker = container.getElementsByClassName("side-order")
        expect(ticker.length).toEqual(2)
    });

    it("amount should only take numeric values", () => {
        const orderAmount = container.querySelector(".order-amount");

        fireEvent.change(orderAmount!, { target: { value: 'abc' } })
        expect(orderAmount!.getAttribute("value")).toBe("")

        fireEvent.change(orderAmount!, { target: { value: '47' } })
        expect(orderAmount!.getAttribute("value")).toBe("47")
    });

    it("prices must be displayed in the specified amount", async () => {

        serverWS.send({
            messageType: MESSAGE_FROM_SERVER.MarketDataUpdate,
            message: { prices }
        });

        const orderAmount = container.querySelector(".order-amount");
        fireEvent.change(orderAmount!, { target: { value: '3' } })

        const pricesElements = container.getElementsByClassName("price")
        const priceSell = pricesElements.item(0)!;
        const priceBuy = pricesElements.item(1)!;

        expect(priceSell.innerHTML).toBe((prices.Sell * 3).toFixed(3));
        expect(priceBuy.innerHTML).toBe((prices.Buy * 3).toFixed(3));
    });

    it('MarketDataUpdate should trigger rendering prices', () => {

        serverWS.send({
            messageType: MESSAGE_FROM_SERVER.MarketDataUpdate,
            message: { subscriptionId: "", prices },
        });

        const pricesElements = container.querySelectorAll(".price");

        expect(pricesElements.item(0).innerHTML).toBe(prices.Sell.toFixed(3));
        expect(pricesElements.item(1).innerHTML).toBe(prices.Buy.toFixed(3));
    });

    it("on change trading instrument should send UnsubscribeMarketData / SubscribeMarketData messages to server", async () => {

        serverWS.send(messageSuccessInfo)

        const tradingInstrument = container.getElementsByClassName("trading-instrument")[0]

        act(() => {
            userEvent.selectOptions(tradingInstrument!, 'eur_usd');
        })

        await expect(serverWS).toReceiveMessage(messageUnsubscribeMarketData)
        await expect(serverWS).toReceiveMessage(messageSubscribeMarketData)
    });

    it('PlaceOrder should add the order to the list', async () => {

        //simulate subscription
        serverWS.send(messageSuccessInfo);

        const tradingInstrument = container.querySelector(".trading-instrument");
        const orderAmount = container.querySelector(".order-amount");
        const buttonElements = container!.querySelectorAll(".button");
        const buttonSell = buttonElements!.item(0);
        const buttonBuy = buttonElements!.item(1);

        act(() => {
            userEvent.selectOptions(tradingInstrument!, 'eur_usd');
        })
        //first messages UnsubscribeMarketData and SubscribeMarketData
        await expect(serverWS).toReceiveMessage(messageUnsubscribeMarketData);
        await expect(serverWS).toReceiveMessage(messageSubscribeMarketData);

        fireEvent.change(orderAmount!, { target: { value: '6' } });

        //set prices
        serverWS.send({
            messageType: MESSAGE_FROM_SERVER.MarketDataUpdate,
            message: { subscriptionId: "", prices }
        });

        act(() => {
            userEvent.click(buttonSell);
            userEvent.click(buttonBuy);
        })

        await expect(serverWS).toReceiveMessage({
            messageType: MESSAGE_TO_SERVER.PlaceOrder,
            message: { order: orderSell }
        });

        //messages UnsubscribeMarketData when cleansing 
        await expect(serverWS).toReceiveMessage(messageUnsubscribeMarketData);

        await expect(serverWS).toReceiveMessage({
            messageType: MESSAGE_TO_SERVER.PlaceOrder,
            message: { order: orderBuy }
        });
    });
})