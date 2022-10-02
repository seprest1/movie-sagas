import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import './Details.css'

//MUI
import { Button } from '@material-ui/core'

function Details(){
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.movieDetails)

    useEffect(() => {
        getDetails();
        return removeFlicker();     //remove flickering upon load
    }, [params.id]);    //runs function again when ID changes

    const getDetails = () => {
        const movieId = Number(params.id);
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        });
    };

    const removeFlicker = () => {
        dispatch({
            type: 'CLEAR_MOVIE_DETAILS'
        });
    };

    const goBack = () => {
        history.push('/');
    };

    return (
        <div className="movieDetails">
            <img src={movie.poster} alt={movie.title} className="movieDetailedPoster"/>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            {movie.genre && <p> Genres: {movie.genre.join(', ')}</p>}
            <Button onClick={goBack} variant="outlined">Back</Button>
        </div>
    )
}

export default Details;