import React from "react";
import { render } from "@testing-library/react";
import Designation from "./designation";

let container: HTMLElement;
const label: string = "Label Designation";

beforeEach(() => {
    ({ container } = render(<Designation label={label} />));
});

describe("Designation component", () => {
    it("should contain passed label", () => {
        const divElement = container.querySelector(".designation")!;
        expect(divElement.innerHTML).toBe(label)
    })
})