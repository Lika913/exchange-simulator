import './orders.css';
import { useContext } from 'react';
import { GlobalStateContext } from '../../context-provider/context-provider';
import { IGlobalState } from '../../../types/global-state';
import Order from './order/order';

const Orders = (): JSX.Element => {

    const { orders } = useContext(GlobalStateContext) as IGlobalState

    return (
        <div className='orders'>
            {orders.map(order =>
                <Order
                    key={order.id}
                    order={order}
                />
            )}
        </div>
    );
}

export default Orders;
