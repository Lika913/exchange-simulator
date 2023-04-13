import './header.css';
import TitleCell from '../../table-components/title-cell/title-cell';
import { IHeaderProps } from '../../../types/props/header-props';

const Header = (props: IHeaderProps): JSX.Element => {
    
    return (
        <div className='header'>
            {props.titles.map((header, index) =>
                <TitleCell
                    key={index}
                    title={header}
                />)}
        </div>
    );
}

export default Header;