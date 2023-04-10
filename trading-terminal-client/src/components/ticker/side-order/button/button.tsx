import { LIGHT_COLORS_SIDE } from '../../../../constants/colors';
import { IButtonProps } from '../../../../types/props/button-props';
import './button.css';

const Button = (props: IButtonProps): JSX.Element => {

  const color: string = LIGHT_COLORS_SIDE[props.label]

  return (
    <button 
      className="button"
      onClick={props.onClick}
      style={{
        background: color
      }}
    >
      {props.label}            
    </button>
  );
}

export default Button;