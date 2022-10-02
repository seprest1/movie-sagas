const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//gets movie data from db
router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY id`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const movieId = result.rows[0].id;
    const genres = req.body.genres;

    // Now handle the genre reference
    const queryText = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
    //loop through and add movie/genre object to movies_genres database
    for (genre of genres){
      pool.query(queryText, [movieId, genre])
      .catch(err => {
        console.log(err);
        res.sendStatus(500)
      })};

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;