import './ticker.css';
import { WebsocketClientContext, SubscriptionIdContext, PricesContext } from '../context-provider/context-provider';
import { Instrument } from '../../types/order/instrument';
import { IOrder } from '../../types/order/order';
import { Side } from '../../types/order/side';
import OrderAmount from './order-amount/order-amount';
import SideOrder from './side-order/side-order';
import React, { useState } from 'react'
import TradingInstrument from './trading-instrument/trading-instrument';
import Partition from '../partition/partition';

const Ticker = (): JSX.Element => {
  const [instrument, setInstrument] = useState<Instrument | "">("");
  const [amount, setAmount] = useState<number | "">("");

  const prices = React.useContext(PricesContext);
  const subscriptionId = React.useContext(SubscriptionIdContext);
  const websocketClient = React.useContext(WebsocketClientContext);
 
  const placeOrder = (side: Side) => {

    if (!amount || !instrument) {
      alert("\u{1F9D0} Вы не заполнили все необходимые данные")
      return
    }

    const newOrder: IOrder = {
      side: side,
      price: Number((prices[side] * amount).toFixed(3)),
      amount: amount,
      instrument: instrument,
    }
    websocketClient?.placeOrder(newOrder)

    setInstrument("")
    setAmount("")
    websocketClient?.unsubscribeMarketData(subscriptionId)
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
      <div className='side-orders'>
        <SideOrder
          buttonLabel="Sell"
          onClick={() => placeOrder("Sell")}
          price={prices["Sell"] * (amount || 1)}
        />
        <Partition />
        <SideOrder
          buttonLabel="Buy"
          onClick={() => placeOrder("Buy")}
          price={prices["Buy"] * (amount || 1)}
        />
      </div>
    </div>
  );
}

export default Ticker;
