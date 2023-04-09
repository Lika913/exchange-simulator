import './order-amount.css';
import { IOrderAmountProps } from '../../../types/props/order-amount-props';

const OrderAmount = (props: IOrderAmountProps): JSX.Element => {

  const clearFromSymbols = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.key.match(/[0-9]/) && event.key !== "Backspace") {
      event.preventDefault()
    }
  }

  const setAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueNumber = Number(event.target.value)
    props.setAmount(valueNumber)
  }

  return (
    <input 
        type="text" 
        className="order-volume"
        onKeyDown={clearFromSymbols}
        onChange={setAmount}
        value={props.amount}
    />
  );
}

export default OrderAmount;
