import './header.css';
import { headers } from '../../../constants/headers';
import TitleCell from '../../table-components/title-cell/title-cell';

const Header = (): JSX.Element => {

    return (
        <div className='header'>
            {headers.map((header, index) =>
                <TitleCell
                    key={index}
                    title={header}
                />)}
        </div>
    );
}

export default Header;