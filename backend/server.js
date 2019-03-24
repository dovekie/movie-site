const express = require("express");
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();
const API_PORT = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// the Internet Movie Database API
const movieAPI = 'https://api.themoviedb.org/3/';
const apiKey = process.env.MOVIE_API_KEY;

// this method fetches the most popular movies
app.get('/', cors(corsOptions), (req, res) => {
  const page = req.query.page == null ? 1 : parseInt(req.query.page);
  fetch(`${movieAPI}movie/popular?api_key=${apiKey}&page=${page}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

// this method gets all movies containing a search string in their title
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Captain+Marvel
app.get('/search/title/:title', cors(corsOptions), (req, res) => {
  const title = req.params.title;
  const page = req.query.page == null ? 1 : parseInt(req.query.page);
  console.log("Searching for", `${movieAPI}search/movie?api_key=${apiKey}&query=${title}&page=${page}`)
  fetch(`${movieAPI}search/movie?api_key=${apiKey}&query=${title}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

// this method gets data about a particular movie
// https://api.themoviedb.org/3/movie/343611?api_key={api_key}
app.get('/search/id/:id', cors(corsOptions), (req, res) => {
  const id = req.params.id;
  console.log("Searching for", `${movieAPI}movie/${id}?api_key=${apiKey}`)
  fetch(`${movieAPI}movie/${id}?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

app.get('/genres', cors(corsOptions), (req, res) => {
  console.log("Searching for", `${movieAPI}genre/movie/list`)
  fetch(`${movieAPI}genre/movie/list?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));
});

app.get('/search/genre/:genre', cors(corsOptions), (req, res) => {
  const genre = req.params.genre;
  const page = req.query.page == null ? 1 : parseInt(req.query.page);
  console.log("Searching for", `${movieAPI}discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`)
  fetch(`${movieAPI}discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`)
    .then((res) => res.json())
    .then((data) => res.send({data}));

});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
