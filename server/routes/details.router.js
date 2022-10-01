const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const movieId = req.params.id;
    const sqlQuery = `
        SELECT movies.title, movies.description, movies.poster, 
        JSON_AGG(genres.name) AS genre FROM movies,
            JOIN movies_genres ON movies_genres.movie_id = movies.id,
            JOIN genres on movies_genres.genre_id = genres.id,
            WHERE movies.id = $1,
            GROUP BY movies.title, movies.description, movies.poster;`;
    pool.query(sqlQuery, movieId)
        .then((response) => {
        console.log(response.rows);
        res.send(response.rows);
        })
        .catch((error) => {
        console.log('ERROR: Getdetails', error);
        res.sendStatus(500)
        });
});

module.exports = router;