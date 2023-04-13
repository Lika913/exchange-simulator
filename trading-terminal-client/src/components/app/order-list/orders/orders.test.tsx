import React from "react";
import { render, } from "@testing-library/react";
import WS from "jest-websocket-mock";
import { CONNECTION_URL } from "../../../../constants/url";
import { ContextProvider } from "../../../context-provider/context-provider";
import Orders from "./orders";
import { MESSAGE_FROM_SERVER } from "../../../../constants/message-from-server";
import {orders} from "../../../../constants/test-data"

let serverWS: WS;
let container: HTMLElement;

beforeEach(async () => {
    serverWS = new WS(CONNECTION_URL);

    ({ container } = render(
        <ContextProvider>
            <Orders />
        </ContextProvider>));
});

afterEach(() => {
    WS.clean();
});

describe("Orders component", () => {

    it("ExecutionReport should trigger rendering orders", () => {

        serverWS.send(JSON.stringify({
            messageType: MESSAGE_FROM_SERVER.ExecutionReport,
            message: { orders }
        }));

        const ordersElements = container.querySelectorAll(".cell");
        expect(ordersElements.length).toEqual(24);

        //compare the values ​​of the id column
        expect(ordersElements.item(0).innerHTML).toEqual(orders[0].id?.toString());
        expect(ordersElements.item(8).innerHTML).toEqual(orders[1].id?.toString());
        expect(ordersElements.item(16).innerHTML).toEqual(orders[2].id?.toString());
    });
});