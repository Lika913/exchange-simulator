import './position-scoreboard.css';
import { useContext } from 'react';
import { Instrument } from '../../types/order/instrument';
import InstrumentPosition from './instrument-position/instrument-position';
import { PositionsContext } from '../context-provider/context-provider';
import Partition from '../partition/partition';
import { insertBetweenElements } from '../../logic/helpers';

const PositionScoreboard = (): JSX.Element => {
    const positions = useContext(PositionsContext);
    const elements = Object.entries(positions).map(([instrument, position]) =>
        <InstrumentPosition
            key={instrument}
            instrument={instrument as Instrument}
            prices={position}
        />);

    insertBetweenElements(elements, <Partition />)

    return (
        <div className="position-scoreboard">
            {elements}
        </div>);
}

export default PositionScoreboard;