import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from './Select'

function AddMovie(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [movie, setMovie] = useState({movieInput});
    const genreInputs = useSelector(store => store.genreInputs)

    const goBackHome = () => {
        history.push('/');
    };

    //object to send to DB
    const movieInput = {
        title: "",
        poster: "",
        description: "",
      };

    const submitMovie = () => {
        // dispatch({
        //     type: 
        //     payload: 
        // });
    };

    //allows user to add more genres
    const addSelect = () => {
        dispatch({type: 'SET_GENRE_INPUTS'})
        console.log(genreInputs);
    };

    return(
        <div>
            <h2>Add Movie:</h2>
            <div className="title">
            <input 
                type="text"
                value={movie.title}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Title"
                />
            </div>
            <div className="url">
                <input 
                    type="text"
                    value={movie.poster}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="movie_poster_image_.jpg"
                    />
            </div>
            <div className="description">
                <input 
                    type="text"
                    value={movie.description}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="Description"
                    />
            </div>
            <div className="genreSelects">
                {genreInputs.map((input, i) => <Select key={i}/>)}
                <button onClick={addSelect}>Add Genre</button>
            </div>
            <div className="buttons">
                <button onClick={goBackHome}>Cancel</button>
                <button onClick={submitMovie}>Save</button>
            </div>
        </div>
            
    )
}

export default AddMovie;
