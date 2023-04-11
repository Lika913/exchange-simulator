import './position-scoreboard.css';
import { useContext } from 'react';
import { Instrument } from '../../types/order/instrument';
import InstrumentPosition from './instrument-position/instrument-position';
import { PositionsContext } from '../context-provider/context-provider';
import Partition from '../partition/partition';

const PositionScoreboard = (): JSX.Element => {
    const positions = useContext(PositionsContext);
    const entries = Object.entries(positions);

    return (
        <div className="position-scoreboard">
            {entries.map(([instrument, position], index) =>
                <>
                    <InstrumentPosition
                        instrument={instrument as Instrument}
                        prices={position}
                    />
                    {index !== entries.length - 1 ? <Partition /> : null}
                </>
            )}
        </div>);
}

export default PositionScoreboard;