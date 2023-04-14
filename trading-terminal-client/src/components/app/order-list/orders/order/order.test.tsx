import React from "react";
import { render } from "@testing-library/react";
import Order from "./order";
import { IOrder } from "../../../../../types/order/order";
import { ContextProvider } from "../../../../context-provider/context-provider";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { IMessage } from "../../../../../types/messages/message";
import { MESSAGE_TO_SERVER } from "../../../../../constants/message-to-server";
import { WS } from "jest-websocket-mock";
import { CONNECTION_URL } from "../../../../../constants/url";

let container: HTMLElement;
let serverWS: WS;
const order: IOrder = {
    id: 123,
    changeTime: new Date("10-10-10"),
    creationTime: new Date("11-10-10"),
    status: "Filled",
    side: "Sell",
    price: 7555,
    amount: 6,
    instrument: "eur_usd",
};

beforeEach(async () => {
    serverWS = new WS(CONNECTION_URL, { jsonProtocol: true });

    ({ container } = render(
        <ContextProvider>
            <Order order={order} />
        </ContextProvider>));

    await serverWS.connected;
});

afterEach(() => {
    WS.clean();
});

describe("Order component", () => {

    it("should render all columns (+ cancellation mark)", () => {
        expect(container.children.length).toBe(9)
    });

    it("should be hidden when active if status not active", () => {
        const cancellationMark = container.querySelector(".cancellation-mark")!;
        expect(cancellationMark.getAttribute("style")).toBe("visibility: hidden;")
    })

    it("clicking on cancellation mark should send CancelOrder message to server", async () => {

        const cancellationMark = container.querySelector(".cancellation-mark");

        act(() => {
            userEvent.click(cancellationMark!);
        })

        const message: IMessage = {
            messageType: MESSAGE_TO_SERVER.CancelOrder,
            message: { orderId: 123 }
        }
        await expect(serverWS).toReceiveMessage(message)
    });
})