import { IPriceProps } from '../../../../../types/props/price-props'
import './price.css';

const Price = (props: IPriceProps): JSX.Element => {
  
  return (
    <div className="price">
      {props.price ? props.price?.toFixed(3) : props.price}
    </div>
  );
}

export default Price;