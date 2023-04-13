import './order-amount.css';
import { IOrderAmountProps } from '../../../types/props/order-amount-props';

const OrderAmount = (props: IOrderAmountProps): JSX.Element => {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value.match(/[^0-9]/)) {
      event.preventDefault();
      return;
    }

    props.setAmount(Number(value))
  }

  return (
    <input 
        type="text" 
        className="order-amount"
        onChange={onChange}
        data-testid="input-order-amount"
        value={props.amount}
    />
  );
}

export default OrderAmount;
