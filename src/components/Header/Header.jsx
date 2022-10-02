import './Header.css';
import { useHistory } from 'react-router-dom';

function Header(){
    const history = useHistory();
    const goHome = () => {
        history.push('/');
    };

    return (
        <header onClick={goHome} className="sign">
            <h1 >Now Showing:</h1>
        </header>
    )
}

export default Header;