import { Side } from "../order/side";

export interface IButtonProps {
    label: string,
    onClick: React.MouseEventHandler,
    color?: string
}