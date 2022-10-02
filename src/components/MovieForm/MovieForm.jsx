import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './MovieForm.css'

//MUI
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

import Select from 'react-select'

function MovieForm(){
    const history = useHistory();
    const dispatch = useDispatch();

    //get genres for select options
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    //go back route
    const goBackHome = () => {
        history.push('/');
    };

    const allGenres = useSelector(store => store.genres);
    const [genresToAdd, setGenresToAdd] = useState([]);
    //movie object
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
        <ThemeProvider theme={theme}>
            bg <section className="formSection">
                <div classname="formWrapper">
                    <h2 className="formh1">ADD FILM:</h2>
                    <div className="inputs">
                        <div className="title">
                        <TextField
                            variant="filled" 
                            color="secondary"
                            type="text"
                            value={movie.title}
                            onChange={(e) => setMovie({...movie, title: e.target.value})}
                            placeholder="Title"
                            />
                        </div>
                        <div className="url">
                            <TextField
                                variant="filled" 
                                color="secondary"
                                type="text"
                                value={movie.poster}
                                onChange={(e) => setMovie({...movie, poster: e.target.value})}
                                placeholder="movie_poster_image_.jpg"
                                />
                        </div>
                        <div className="description">
                            <TextField
                                variant="filled" 
                                color="secondary"
                                type="text"
                                value={movie.description}
                                onChange={(e) => setMovie({...movie, description: e.target.value})}
                                placeholder="Description"
                                />
                        </div>
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
                            className="select"
                            />
                    </div>
                    <div className="buttons">
                        <IconButton onClick={goBackHome} variant="outlined">Cancel</IconButton>
                        <IconButton onClick={submitMovie} variant="outlined">Save</IconButton>
                    </div>
                </div>
            </section>
        </ThemeProvider>
    )
}

export default MovieForm;
