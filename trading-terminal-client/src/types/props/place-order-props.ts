import { Side } from "../order/side";

export interface IPlaceOrderProps {
    price: number,
    buttonLabel: Side,
    onClick: React.MouseEventHandler,
}