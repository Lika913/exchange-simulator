import { Side } from "../order/side";

export interface ISideOrderProps {
    price: number,
    buttonLabel: Side,
    onClick: React.MouseEventHandler,
}