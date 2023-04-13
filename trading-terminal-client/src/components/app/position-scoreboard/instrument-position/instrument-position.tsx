import { COLORS_SIDE } from '../../../../constants/colors';
import { INSTRUMENTS } from '../../../../constants/instruments';
import { IInstrumentPositionProps } from '../../../../types/props/instrument-position-props';
import TitleCell from '../../../independent-components/table-components/title-cell/title-cell';
import Cell from '../../../independent-components/table-components/cell/cell';
import './instrument-position.css';
import SideValue from '../side-value/side-value';

const InstrumentPosition = (props: IInstrumentPositionProps): JSX.Element => {

    const benefit = Number((props.prices["Buy"] - props.prices["Sell"]).toFixed(3));
   
    let color: string | undefined;
    if (benefit > 0) {
        color = COLORS_SIDE["Buy"];
    }
    if (benefit < 0) {
        color = COLORS_SIDE["Sell"];
    }

    return (
        <div className="instrument-position">
            <TitleCell title={INSTRUMENTS[props.instrument]} />
            <SideValue 
                side="Sell"
                value={props.prices["Sell"]}
            />
            <SideValue 
                side="Buy"
                value={props.prices["Buy"]}
            />
            <Cell
                value={benefit > 0 ? "+" + benefit : benefit}
                color={color}
                weight="bold"
            />
        </div>
    );
}

export default InstrumentPosition;