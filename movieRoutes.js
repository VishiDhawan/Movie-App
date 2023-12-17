const express = require ('express');
const router = express.Router();
const movie = require('../models/movie');
const { Movie } = require('@material-ui/icons');

router.get ('/', async (req, res) => {
try{
    const movies = await Movie.find ({status: 'PUBLISHED'});
    res.json(movies);

} catch (error) {
    res.status(500).json({error: 'Internal Server Error'});

}
});

module.exports = router;

