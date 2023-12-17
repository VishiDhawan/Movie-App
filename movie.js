const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genres: [String], // Assuming genres is an array of strings
  duration: String,
  release_date: Date,
  critics_rating: Number,
  storyline: String,
  wiki_url: String,
  trailer_url: String,
  poster_url: String,
  artists: [
    {
      first_name: String,
      last_name: String,
      wiki_url: String,
      profile_url: String,
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
