import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from './Select'

function AddMovie(){
    const history = useHistory();
    const [movie, setMovie] = useState(movieValues);
    const [genre, setGenre] = useState('');
    const movieValues = {
        title: "",
        poster: "",
        description: "",
      };

    const submitMovie = () => {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        });
    };

    const goBack = () => {
        history.push('/');
    };

    return(
        <div>
            <h2>Add Movie:</h2>
            <input 
                type="text"
                value={movie.title}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Title"
                />
            <input 
                type="text"
                value={movie.poster}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="movie_poster_image_.jpg"
                />
            <input 
                type="text"
                value={movie.description}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Description"
                />
            <Select />
            <button onClick={goBack}>Cancel</button>
            <button onClick={submitMovie}>Save</button>
        </div>
            
    )
}

export default AddMovie;
