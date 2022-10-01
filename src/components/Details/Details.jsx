import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


function Details(){
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.movieDetails)

    useEffect(() => {
        const movieId = params.id;
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        })
        return () => {  //remove flickering upon load
        dispatch({
            type: 'CLEAR_MOVIE_DETAILS'
        })
        }   //runs function again when ID changes
    }, [params.id]);

    const goBack = () => {
        history.push('/');
    };

    return (
        <div>
            <img src={movie.poster} alt={movie.title} className="movieDetailedPoster"/>
            <h2>MovieTitle: {movie.title}</h2>
            <h3>Description:</h3>
            <p>{movie.description}</p>
            <p>Genres: {movie.genre}</p>
            <button onClick={goBack}>Back</button>
        </div>
    )
}

export default Details;