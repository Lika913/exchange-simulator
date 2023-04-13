import './order-list.css';
import Header from './header/header';
import Orders from './orders/orders';
import { TITLES_ORDERS } from '../../constants/headers';

const OrderList = (): JSX.Element => {

  return (
    <div className="order-list">
      <Header titles={TITLES_ORDERS}/>
      <Orders />      
    </div>
  );
}

export default OrderList;