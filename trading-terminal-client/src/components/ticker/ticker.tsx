import './ticker.css';
import { GlobalStateContext, SendMassegeDispatch } from '../context-provider/context-provider';
import { IGlobalState } from '../../types/global-state';
import { Instrument } from '../../types/order/instrument';
import { IOrder } from '../../types/order/order';
import { Side } from '../../types/order/side';
import { IWebsocketClient } from '../../types/websocket-client';
import OrderAmount from './order-amount/order-amount';
import PlaceOrder from './side-order/side-order';
import React, { useState } from 'react'
import TradingInstrument from './trading-instrument/trading-instrument';
import Partition from '../partition/partition';

const Ticker = (): JSX.Element => {

  const [instrument, setInstrument] = useState<Instrument | "">("")
  const [amount, setAmount] = useState<number | "">("")
  const { prices, subscriptionId } = React.useContext(GlobalStateContext) as IGlobalState;
  const websocketClient = React.useContext(SendMassegeDispatch) as IWebsocketClient;
 
  const placeOrder = (side: Side) => {

    if (!amount || !instrument) {
      alert("\u{1F9D0} Вы не заполнили все необходимые данные")
      return
    }

    const now = new Date()
    const newOrder: IOrder = {
      creation_time: now,
      change_time: now,
      status: 'Active',
      side: side,
      price: Number((prices[side] * amount).toFixed(3)),
      amount: amount,
      instrument: instrument,
    }

    websocketClient.placeOrder(newOrder)

    setInstrument("")
    setAmount("")
    websocketClient.unsubscribeMarketData(subscriptionId)
  }

  return (
    <div className="ticker">
      <TradingInstrument
        instrument={instrument}
        setInstrument={setInstrument}
      />
      <OrderAmount
        amount={amount}
        setAmount={setAmount}
      />
      <div className='place-orders'>
        <PlaceOrder
          buttonLabel="Sell"
          onClick={() => placeOrder("Sell")}
          price={prices["Sell"] * (amount || 1)}
        />
        <Partition />
        <PlaceOrder
          buttonLabel="Buy"
          onClick={() => placeOrder("Buy")}
          price={prices["Buy"] * (amount || 1)}
        />
      </div>
    </div>
  );
}

export default Ticker;
