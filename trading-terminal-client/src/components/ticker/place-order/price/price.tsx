import { IPriceProps } from '../../../../types/props/price-props';
import './price.css';

const Price = (props: IPriceProps): JSX.Element => {
  
  return (
    <div className="price">
      {props.price}
    </div>
  );
}

export default Price;