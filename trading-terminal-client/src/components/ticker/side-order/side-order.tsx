import './side-order.css';
import { ISideOrderProps } from '../../../types/props/side-order-props';
import Button from './button/button';
import Price from './price/price';

const SideOrder = (props: ISideOrderProps): JSX.Element => {

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

export default SideOrder;