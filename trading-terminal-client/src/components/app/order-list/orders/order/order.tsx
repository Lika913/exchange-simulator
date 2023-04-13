import './order.css';
import { INSTRUMENTS } from '../../../../../constants/instruments';
import CancellationMark from './cancellation-mark/cancellation-mark';
import { IOrderProps } from '../../../../../types/props/order-props';
import { COLORS_SIDE } from '../../../../../constants/colors';
import Cell from '../../../../independent-components/table-components/cell/cell';
import DateCell from '../../../../independent-components/table-components/date-cell/date-cell';

const Order = (props: IOrderProps): JSX.Element => {

  const { order } = props
  const color: string = COLORS_SIDE[order.side]

  return (
    <>
      <Cell value={order.id}/>
      <DateCell value={order.creationTime!}/>
      <DateCell value={order.changeTime!}/>
      <Cell value={order.status}/>
      <Cell 
        value={order.side} 
        color={color}
        weight="bold"
      />
      <Cell 
        value={order.price} 
        color={color}
        weight="bold"
      />
      <Cell 
        value={order.amount} 
        color={color}
        weight="bold"
      />
      <Cell value={INSTRUMENTS[order.instrument]}/>
      <CancellationMark 
        order={order}
      />      
    </>
  );
}

export default Order;