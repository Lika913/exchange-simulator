import { LIGHT_COLORS_SIDE } from '../../../constants/colors';
import { IButtonProps } from '../../../types/props/button-props';
import './button.css';

const Button = (props: IButtonProps): JSX.Element => {

  return (
    <button 
      className="button"
      onClick={props.onClick}
      style={{
        background: props.color
      }}
    >
      {props.label}            
    </button>
  );
}

export default Button;