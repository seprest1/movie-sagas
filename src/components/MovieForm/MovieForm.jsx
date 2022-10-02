import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './MovieForm.css'

//MUI
import TextField from '@mui/material/TextField';
import Button from "@mui/material/button";
import ButtonGroup from '@mui/material/ButtonGroup';


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
            <section className="formSection">
                    <h2 className="formh1">ADD FILM:</h2>
                    <div className="inputWrapper">
                        <div className="inputs">
                            <div className="title">
                            <TextField
                                variant="outlined" 
                                color="error"
                                type="text"
                                value={movie.title}
                                onChange={(e) => setMovie({...movie, title: e.target.value})}
                                label="Title"
                                style = {{width: 500}}
                                />
                            </div>
                            <div className="url">
                                <TextField
                                    variant="outlined" 
                                    color="error"
                                    type="text"
                                    value={movie.poster}
                                    onChange={(e) => setMovie({...movie, poster: e.target.value})}
                                    label="Poster"
                                    style = {{width: 500}}
                                    />
                            </div>
                            <div className="description">
                                <TextField
                                    variant="outlined" 
                                    color="error"
                                    multiline
                                    rows={4}
                                    type="text"
                                    value={movie.description}
                                    onChange={(e) => setMovie({...movie, description: e.target.value})}
                                    label="Description"
                                    style = {{width: 500}}
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
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                    ...theme.colors,
                                      text: 'orangered',
                                      primary25: '#d32f2f',
                                      primary: 'black',
                                    },
                                  })}
                                />
                        </div>
                        <ButtonGroup variant="contained" color="error" className="buttons">
                            <Button onClick={goBackHome}>Cancel</Button>
                            <Button onClick={submitMovie}>Submit</Button>
                        </ButtonGroup>
                    </div>
            </section>
    )
}

export default MovieForm;
