import { ICellProps } from '../../../../../../types/props/cell-props';
import './cell.css';

const Cell = (props: ICellProps): JSX.Element => {

    return (
        <div 
            className="cell" 
            style={props.color ? {
                color: props.color,
                fontWeight: "bold"
            } : {}}
        >
            { props.value}
        </div>
    );
}

export default Cell;