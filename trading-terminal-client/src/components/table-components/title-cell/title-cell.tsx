import { ITitleCellProps } from '../../../types/props/title-cell-props';
import './title-cell.css';

const TitleCell = (props: ITitleCellProps): JSX.Element => {

    return (
        <div className="title">
            {props.title}      
        </div>
    );
}

export default TitleCell;