import { LIGHT_COLORS_SIDE } from '../../../../constants/colors';
import { ISideValueProps } from '../../../../types/props/side-value-props';
import Cell from '../../../independent-components/table-components/cell/cell';
import './side-value.css';

const SideValue = (props: ISideValueProps): JSX.Element => {

    return (
        <div className="side-position">
           <label
                style={{
                    background: LIGHT_COLORS_SIDE[props.side]
                }}           
           >{props.side.toLowerCase()}</label>
           <Cell value={props.value} />
        </div>
    );
}

export default SideValue;