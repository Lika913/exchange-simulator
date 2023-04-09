import './order.css';
import { INSTRUMENTS } from '../../../../constants/instruments';
import Cell from './cells/cell/cell';
import CancellationMark from './cancellation-mark/cancellation-mark';
import { IOrderProps } from '../../../../types/props/order-props';
import DateCell from './cells/date-cell/date-cell';
import { COLORS_SIDE_TEXT } from '../../../../constants/colors';

const Order = (props: IOrderProps): JSX.Element => {

  const { order } = props
  const color: string = COLORS_SIDE_TEXT[order.side]

  return (
    <>
      <Cell value={order.id}/>
      <DateCell value={order.creation_time}/>
      <DateCell value={order.change_time}/>
      <Cell value={order.status}/>
      <Cell 
        value={order.side} 
        color={color}
      />
      <Cell 
        value={order.price} 
        color={color}
      />
      <Cell 
        value={order.amount} 
        color={color}
      />
      <Cell value={INSTRUMENTS[order.instrument]}/>
      <CancellationMark 
        order={order}
      />      
    </>
  );
}

export default Order;