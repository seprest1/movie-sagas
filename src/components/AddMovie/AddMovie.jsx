import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from './Select'

function AddMovie(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [movie, setMovie] = useState({movieInput});

    const genres = useSelector(store => store.genres);
    const genreInputs = useSelector(store => store.genreInputs)

    const goBackHome = () => {
        history.push('/');
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    console.log(genres);

    //movie object
    const movieInput = {
        title: "",
        poster: "",
        description: "",
        genres: []
      };

    const submitMovie = () => {
        e.preventDefault();
        // dispatch({
        //     type: 
        //     payload: 
        // });
    };

    //allows user to add more genres selects
    const addSelect = () => {
        dispatch({type: 'SET_GENRE_INPUTS'})
        console.log(genreInputs);
    };

    return(
        <form onSubmit={submitMovie}>
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

                {genreInputs.map((input, i) => 
                    <select key={i}>                        {/* maps through genres and 
                                                        makes an option value for each */}
                        {genres.map(genre => <option value={genre.name}>{genre.name}</option>)}
                                                            {/* don't judge me... lol*/}
                    </select>)}
                <button onClick={addSelect}>+</button>

            </div>
            <div className="buttons">
                <button onClick={goBackHome}>Cancel</button>
                <button>Save</button>
            </div>
        </form>
          
    )
}

export default AddMovie;
