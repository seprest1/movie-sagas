import { useHistory } from 'react-router-dom'

function Header(){
    const history = useHistory();
    const goToPage = () => {
        history.push('/add_movie');
    };

    return (
        <header className="sign">
            <h1 >Now Showing:</h1>
            <nav>
                <button onClick={goToPage}>Add Movie</button>
            </nav>
        </header>
    )
}

export default Header;