import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// saga 
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//////////// saga functions ////////////
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
};

function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    };
};

function* fetchMovieDetails(action) {
    const movieId = action.payload
    console.log(movieId);
    const movieDetails = yield axios({
        method: 'GET',
        url: `/api/movie/${movieId}`
    })
    console.log(movieDetails.data);
    yield put({
        type: 'SET_MOVIE_DETAILS',
        payload: movieDetails.data
    });
};

function* fetchGenres() {
    try {
        const genres = yield axios.get('/api/genre');

        console.log('Genres:', genres.data);

        yield put({ 
            type: 'SET_GENRES', 
            payload: genres.data 
        });
    } 
    catch (error) {
        console.log('GET genres failed', error);
    };
};

function* addMovie(action){
    try{
        console.log(action.payload);
        yield axios({
            method: 'POST',
            url: '/api/movie',
            data: action.payload
        })   
        yield put({
            type: 'FETCH_MOVIES'
        })
    }
    catch(error){
        console.log(error);
      };
};

//////////// reducers ////////////
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
};

const movieDetails = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        case 'CLEAR_MOVIE_DETAILS':
            return {};
        default:
            return state;
    }
};

const sagaMiddleware = createSagaMiddleware();

//////////// store ////////////
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
