import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Select from 'react-select'

function AddMovie(){
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const goBackHome = () => {
        history.push('/');
    };

    const allGenres = useSelector(store => store.genres);
    const [genresToAdd, setGenresToAdd] = useState([]);
    /////movie object/////
    const [movie, setMovie] = useState({
            title: "",      
            description: "",
            genres: []});   
                
    const submitMovie = (e) => {
        e.preventDefault();
        console.log(genresToAdd);

        dispatch({
            type: 'ADD_MOVIE',
            payload: {...movie, genres: genresToAdd}
        });
        goBackHome();
    };

    //options for genre select
    const options = allGenres.map(genre => ({value: genre.id, label: genre.name }));
    

    return(
        <form onSubmit={submitMovie}>
            <h2>Add Movie:</h2>
            <div className="title">
            <input 
                type="text"
                value={movie.title}
                onChange={(e) => setMovie({...movie, title: e.target.value})}
                placeholder="Title"
                />
            </div>
            <div className="url">
                <input 
                    type="text"
                    value={movie.poster}
                    onChange={(e) => setMovie({...movie, poster: e.target.value})}
                    placeholder="movie_poster_image_.jpg"
                    />
            </div>
            <div className="description">
                <input 
                    type="text"
                    value={movie.description}
                    onChange={(e) => setMovie({...movie, description: e.target.value})}
                    placeholder="Description"
                    />
            </div>
            <div className="genreSelects">
                <Select 
                    isMulti
                    options={options}
                    closeMenuOnSelect={false}
                    isSearchable={true}
                    backspaceRemovesValue={true}
                    isOptionDisabled={() => genresToAdd.length >= 3} //limits select to 3 genres
                    onChange={(value) => setGenresToAdd(value.map(item => item.value))} 
                    placeholder="Genre"     //update genre array with selected genre
                    />
            </div>
            <div className="buttons">
                <button onClick={goBackHome}>Cancel</button>
                <button>Save</button>
            </div>
        </form>
          
    )
}

export default AddMovie;
