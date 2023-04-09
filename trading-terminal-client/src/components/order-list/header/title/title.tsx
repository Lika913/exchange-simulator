import { ITitleProps } from '../../../../types/props/title-props';
import './title.css';

const Title = (props: ITitleProps): JSX.Element => {

    return (
        <div className="title">
            {props.title}      
        </div>
    );
}

export default Title;