import './position-scoreboard.css';
import { Fragment, useContext } from 'react';
import { Instrument } from '../../../types/order/instrument';
import InstrumentPosition from './instrument-position/instrument-position';
import { PositionsContext } from '../../context-provider/context-provider';
import Partition from '../../independent-components/partition/partition';

const PositionScoreboard = (): JSX.Element => {
    const positions = useContext(PositionsContext);
    const entries = Object.entries(positions)

    return (
        <div className="position-scoreboard">
            {entries.map(([instrument, position], index) =>
                <Fragment key={index}>
                    <InstrumentPosition
                        instrument={instrument as Instrument}
                        prices={position}
                    />
                    {index !== entries.length - 1 ? <Partition /> : null}
                </Fragment>
            )}
        </div>);
}

export default PositionScoreboard;