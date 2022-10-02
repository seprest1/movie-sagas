import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './MovieList.css'

//MUI
import { Button } from '@material-ui/core';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToDetails = (movieId) => {
        console.log(movieId)
        history.push(`/details/${movieId}`);
      };
    
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
            <nav>
                <Button onClick={goToForm} variant="outlined">Add Movie</Button>
            </nav>
        </main>

    );
}

export default MovieList;