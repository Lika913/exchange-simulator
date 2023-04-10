import { useContext } from 'react';
import { Instrument } from '../../types/order/instrument';
import InstrumentPosition from './instrument-position/instrument-position';
import './position-scoreboard.css';
import { GlobalStateContext } from '../context-provider/context-provider';
import { IGlobalState } from '../../types/global-state';
import Partition from '../partition/partition';

const PositionScoreboard = (): JSX.Element => {

    const { positions } = useContext(GlobalStateContext) as IGlobalState
    const entries = Object.entries(positions);

    return (
        <div className="position-scoreboard">
            {entries.map(([instrument, position], index) => <>
                <InstrumentPosition
                    instrument={instrument as Instrument}
                    prices={position}
                />                
                {index !== entries.length - 1 ? <Partition /> : null}
            </>)}
        </div>);
}

export default PositionScoreboard;