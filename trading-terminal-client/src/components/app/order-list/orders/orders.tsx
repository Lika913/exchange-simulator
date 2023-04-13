import './orders.css';
import { useContext } from 'react';
import { OrdersContext } from '../../../context-provider/context-provider';
import Order from './order/order';

const Orders = (): JSX.Element => {
    const orders = useContext(OrdersContext)

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
