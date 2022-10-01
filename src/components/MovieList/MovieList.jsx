import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="movieCard">
                            <h3 className="movieTitle">{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} className="moviePoster"/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;