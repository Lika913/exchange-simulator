import { IDateCellProps } from '../../../../types/props/date-cell-props';
import Cell from '../cell/cell'
import './date-cell.css';

const DateCell = (props: IDateCellProps): JSX.Element => {

    return (
        <Cell 
            value={new Date(props.value).toLocaleDateString()}
        />
    );
}

export default DateCell;