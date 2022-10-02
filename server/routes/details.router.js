const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//get details from db
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const movieId = req.params.id;
    const queryText = `  
        SELECT movies.title, movies.description, movies.poster, 
        JSON_AGG(genres.name) AS genre FROM movies
            JOIN movies_genres ON movies_genres.movie_id = movies.id
            JOIN genres on movies_genres.genre_id = genres.id
            WHERE movies.id = $1
            GROUP BY movies.title, movies.description, movies.poster;`;
    pool.query(queryText, [movieId])    
        .then((response) => {
        console.log(response.rows[0]);
        res.send(response.rows[0]);
        })
        .catch((error) => {
        console.log('ERROR: Get details', error);
        res.sendStatus(500)
        });
});

module.exports = router;