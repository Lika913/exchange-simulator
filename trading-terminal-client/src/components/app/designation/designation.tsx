import { showErrorNotification } from '../../../logic/notification-helper';
import { IDesignationProps } from '../../../types/props/designation-props';
import './designation.css';

const Designation = (props: IDesignationProps): JSX.Element => {

  return (
    <div className="designation">
        {props.label}
    </div>
  );
}

export default Designation;