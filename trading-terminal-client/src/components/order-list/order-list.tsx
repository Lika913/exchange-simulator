import './order-list.css';
import Header from './header/header';
import Orders from './orders/orders';

const OrderList = (): JSX.Element => {

  return (
    <div className="order-list">
      <Header />
      <Orders />      
    </div>
  );
}

export default OrderList;