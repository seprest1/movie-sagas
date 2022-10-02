import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import './Details.css'

//MUI
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Tooltip from '@mui/material/Tooltip';

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
            <div className="detailsSection">
                <h2 className="detailsTitle">{movie.title}</h2>
                <p>{movie.description}</p>
                {movie.genre && <p className="genres"> Genre: {movie.genre.join(', ')}</p>}
                <div className="backButton">
                    <Tooltip title="Back">
                        <IconButton onClick={goBack} variant="outlined" color="secondary">
                            <ArrowBackIosIcon sx={{ fontSize: 40 }}/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Details;