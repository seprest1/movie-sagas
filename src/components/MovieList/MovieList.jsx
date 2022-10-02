import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './MovieList.css'

//MUI
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Tooltip from '@mui/material/Tooltip';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //when image is clicked, go to details page, send movie ID
    const goToDetails = (movieId) => {
        console.log(movieId)
        history.push(`/details/${movieId}`);
      };

    //when + button is clicked, go to movie form
    const goToForm = () => {
          history.push('/add_movie');
      };

    return (
        <main>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="movieCard" onClick={() => goToDetails(movie.id)}>
                            <img src={movie.poster} alt={movie.title} className="moviePoster"/>
                            <h3 className="movieTitle">{movie.title.toUpperCase()}</h3>
                        </div>
                    );
                })}
            </section>
            <footer className="footer">
                <Tooltip title="+ New Film">
                    <IconButton onClick={goToForm} color="secondary">
                        <AddCircleRoundedIcon sx={{ fontSize: 80 }}/>
                    </IconButton>
                </Tooltip>
            </footer>
        </main>

    );
}

export default MovieList;