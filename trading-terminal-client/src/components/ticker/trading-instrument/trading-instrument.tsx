import './trading-instrument.css';
import { ITradingInstrumentProps } from '../../../types/props/trading-instrument-props';
import { GlobalStateContext, SendMassegeDiapatch } from '../../context-provider/context-provider';
import { IGlobalState } from '../../../types/global-state';
import { IWebsocketClient } from '../../../types/websocket-client';
import { INSTRUMENTS } from '../../../constants/instruments';
import { useContext } from 'react';

const TradingInstrument = (props: ITradingInstrumentProps): JSX.Element => {

  const websocketClient = useContext(SendMassegeDiapatch) as IWebsocketClient;
  const { subscriptionId } = useContext(GlobalStateContext) as IGlobalState;

  const onChange = (event: any) => {
    websocketClient.unsubscribeMarketData(subscriptionId)
    websocketClient.subscribeMarketData(event.target.value)

    props.setInstrument(event.target.value)
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
