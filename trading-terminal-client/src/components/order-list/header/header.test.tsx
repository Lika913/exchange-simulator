import React from "react";
import { render } from "@testing-library/react";
import Header from "./header";

let container: HTMLElement;
const titles: string[] = ["milk", "cheese", "salt"]

beforeEach(() => {
    ({ container } = render(<Header titles={titles} />));
});

describe("Header component", () => {

    it("must render as many elements as he is given", () => {
        const titleElements = container.querySelectorAll(".title");
        expect(titleElements.length).toBe(titles.length);
    });

    it("must render in the order in which they were passed", () => {
        const titleElements = container.querySelectorAll(".title");

        expect(titleElements.item(0).innerHTML).toBe(titles[0]);
        expect(titleElements.item(1).innerHTML).toBe(titles[1]);
        expect(titleElements.item(2).innerHTML).toBe(titles[2]);
    })
})