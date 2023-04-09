import { Side } from "../order/side";

export interface IButtonProps {
    label: Side,
    onClick: React.MouseEventHandler,
}