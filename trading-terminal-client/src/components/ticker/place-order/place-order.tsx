import './place-order.css';
import { IPlaceOrderProps } from '../../../types/props/place-order-props';
import Button from './button/button';
import Price from './price/price';

const PlaceOrder = (props: IPlaceOrderProps): JSX.Element => {

  return (
    <div className="place-order">
      <Price
        price={props.price}
      />
      <Button 
        label={props.buttonLabel}
        onClick={props.onClick}
      />
    </div>
  );
}

export default PlaceOrder;