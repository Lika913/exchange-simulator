import './trading-instrument.css';
import { ITradingInstrumentProps } from '../../../../types/props/trading-instrument-props';
import { WebsocketClientContext, SubscriptionIdContext } from '../../../context-provider/context-provider';
import { INSTRUMENTS } from '../../../../constants/instruments';
import { useContext } from 'react';
import { Instrument } from '../../../../types/order/instrument';

const TradingInstrument = (props: ITradingInstrumentProps): JSX.Element => {

  const websocketClient = useContext(WebsocketClientContext);
  const subscriptionId = useContext(SubscriptionIdContext);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    websocketClient?.unsubscribeMarketData(subscriptionId);
    websocketClient?.subscribeMarketData(event.target.value as Instrument);

    props.setInstrument(event.target.value as Instrument);
  }

  return (
    <select
      className="trading-instrument"
      onChange={onChange}
      value={props.instrument}
    >
      <option hidden disabled></option>
      {
        Object.entries(INSTRUMENTS).map(([key, value]) =>
          <option
            className='option'
            key={key}
            value={key}
          >{value}</option>
        )
      }
    </select>
  );
}

export default TradingInstrument;
