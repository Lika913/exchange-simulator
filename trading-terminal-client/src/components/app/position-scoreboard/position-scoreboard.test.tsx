import React from "react";
import { render } from "@testing-library/react";
import WS from "jest-websocket-mock";
import PositionScoreboard from "./position-scoreboard";
import { CONNECTION_URL } from "../../../constants/url";
import { ContextProvider } from "../../context-provider/context-provider";
import { MESSAGE_FROM_SERVER } from "../../../constants/message-from-server";
import { positionsData } from "../../../constants/test-data";

let container: HTMLElement;
let serverWS: WS;

beforeEach(async() => {

    serverWS = new WS(CONNECTION_URL, { jsonProtocol: true });

    ({ container } = render(
        <ContextProvider>
            <PositionScoreboard />
        </ContextProvider>));

    await serverWS.connected;
});

afterEach(() => {
    WS.clean();
})

describe("PositionScoreboard component", () => {

    it('PositionUpdateData should trigger rendering instrument positions', () => {

        serverWS.send({
            messageType: MESSAGE_FROM_SERVER.PositionUpdateData,
            message: { positionsData }
        });

        const positionsElements = container.querySelectorAll(".cell");
        const benefit = Number((positionsData["eur_rub"].Buy - positionsData["eur_rub"].Sell).toFixed(3));

        expect(positionsElements.item(0).innerHTML).toBe(positionsData["eur_rub"].Sell.toString());
        expect(positionsElements.item(1).innerHTML).toBe(positionsData["eur_rub"].Buy.toString());
        expect(positionsElements.item(2).innerHTML).toBe(benefit.toString());
    });
})