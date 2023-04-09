import './ticker.css';
import { GlobalStateContext, SendMassegeDiapatch } from '../context-provider/context-provider';
import { IGlobalState } from '../../types/global-state';
import { Instrument } from '../../types/order/instrument';
import { IOrder } from '../../types/order/order';
import { Side } from '../../types/order/side';
import { IWebsocketClient } from '../../types/websocket-client';
import OrderAmount from './order-amount/order-amount';
import PlaceOrder from './place-order/place-order';
import React, { useState } from 'react'
import TradingInstrument from './trading-instrument/trading-instrument';

const Ticker = (): JSX.Element => {

  const [instrument, setInstrument] = useState<Instrument | "">("")
  const [amount, setAmount] = useState<number>(0)
  const { prices } = React.useContext(GlobalStateContext) as IGlobalState;
  const websocketClient = React.useContext(SendMassegeDiapatch) as IWebsocketClient;
 
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
      price: prices[side],
      amount: amount,
      instrument: instrument,
    }

    websocketClient.placeOrder(newOrder)

    setInstrument("")
    setAmount(0)
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
          price={prices["Sell"]}
        />
        <div className='partition' />
        <PlaceOrder
          buttonLabel="Buy"
          onClick={() => placeOrder("Buy")}
          price={prices["Buy"]}
        />
      </div>
    </div>
  );
}

export default Ticker;
