import './side-order.css';
import { ISideOrderProps } from '../../../../types/props/side-order-props';
import Button from '../../../independent-components/button/button';
import Price from './price/price';
import { LIGHT_COLORS_SIDE } from '../../../../constants/colors';

 const SideOrder = (props: ISideOrderProps): JSX.Element => {

  return (
    <div className="side-order">
      <Price
        price={props.price}
      />
      <Button 
        label={props.buttonLabel}
        onClick={props.onClick}
        color={LIGHT_COLORS_SIDE[props.buttonLabel]}
      />
    </div>
  );
}

export default SideOrder;