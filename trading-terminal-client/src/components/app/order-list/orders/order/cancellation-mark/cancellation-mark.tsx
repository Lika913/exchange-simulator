import './cancellation-mark.css';
import { useContext } from 'react';
import { ICancellationMarkProps } from '../../../../../../types/props/cancellation-mark-props';
import { WebsocketClientContext } from '../../../../../context-provider/context-provider';
import { showSuccessNotification } from '../../../../../../logic/notification-helper';

const CancellationMark = (props: ICancellationMarkProps): JSX.Element => {

  const websocketClient = useContext(WebsocketClientContext);

  const cancelOrder = () => {
    websocketClient?.cancelOrder(props.order.id as number);
    showSuccessNotification(`Заявка ${props.order.id} успешно отменена`)
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