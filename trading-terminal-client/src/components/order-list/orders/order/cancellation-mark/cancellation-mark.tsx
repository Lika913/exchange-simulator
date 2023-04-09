import { useContext } from 'react';
import { ICancellationMarkProps } from '../../../../../types/props/cancellation-mark-props';
import './cancellation-mark.css';
import { SendMassegeDiapatch } from '../../../../context-provider/context-provider';
import { IWebsocketClient } from '../../../../../types/websocket-client';

const CancellationMark = (props: ICancellationMarkProps): JSX.Element => {

  const websocketClient = useContext(SendMassegeDiapatch) as IWebsocketClient;

  const cancelOrder = () => {
    websocketClient.cancelOrder(props.order.id as number)
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