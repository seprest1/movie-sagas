const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//gets genres from db
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM genres`;
  pool.query(queryText)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    });
});

module.exports = router;