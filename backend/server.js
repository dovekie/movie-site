const express = require("express");
const fetch = require('node-fetch');

const app = express();
const API_PORT = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the Internet Movie Database API
const movieAPI = 'https://api.themoviedb.org/3/';
const apiKey = process.env.MOVIE_API_KEY;

// this method fetches the most popular movies
app.get('/', (req, res) => {
  fetch(`${movieAPI}movie/popular?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

// this method gets all movies containing a search string in their title
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Captain+Marvel
app.get('/search/title/:title', (req, res) => {
  const title = req.params.title;
  console.log("Searching for", `${movieAPI}search/movie?api_key=${apiKey}&query=${title}`)
  fetch(`${movieAPI}search/movie?api_key=${apiKey}&query=${title}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

// this method gets data about a particular movie
// https://api.themoviedb.org/3/movie/343611?api_key={api_key}
app.get('/search/id/:id', (req, res) => {
  const id = req.params.id;
  console.log("Searching for", `${movieAPI}movie/${id}?api_key=${apiKey}`)
  fetch(`${movieAPI}movie/${id}?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));