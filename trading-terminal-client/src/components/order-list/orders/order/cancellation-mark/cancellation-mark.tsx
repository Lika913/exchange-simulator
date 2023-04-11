import './cancellation-mark.css';
import { useContext } from 'react';
import { ICancellationMarkProps } from '../../../../../types/props/cancellation-mark-props';
import { WebsocketClientContext } from '../../../../context-provider/context-provider';

const CancellationMark = (props: ICancellationMarkProps): JSX.Element => {

  const websocketClient = useContext(WebsocketClientContext);

  const cancelOrder = () => {
    websocketClient?.cancelOrder(props.order.id as number);
  }

  return (
    <div 
        className='cancellation-mark' 
        onClick={cancelOrder}
        style={{
          visibility: props.order.status === 'Active' ? "visible" : 'hidden'
        }}
        title='Отменить заявку'
    />
  );
}
export default CancellationMark;