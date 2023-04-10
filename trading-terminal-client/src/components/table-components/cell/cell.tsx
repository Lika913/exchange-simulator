import { ICellProps } from '../../../types/props/cell-props';
import './cell.css';

const Cell = (props: ICellProps): JSX.Element => {

    return (
        <div 
            className="cell" 
            style={{
                color: props.color,
                fontWeight: props.weight
            }}
        >
            { props.value}
        </div>
    );
}

export default Cell;