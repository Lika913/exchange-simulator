import './header.css';
import { headers } from '../../../constants/headers';
import Title from './title/title';

const Header = (): JSX.Element => {

    return (
        <div className='header'>
            {headers.map((header, index) =>
                <Title
                    key={index}
                    title={header}
                />)}
        </div>
    );
}

export default Header;