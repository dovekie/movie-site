import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './App.css';

class MostPopular extends Component {
    state = {
      data: [],
    };
    componentDidMount() {
      fetch('http://localhost:3001/')
        .then((response) => response.json())
        .then((data) => {
          const pagination = this.calculatePagination(data.data);
          this.setState({pagination});
          this.setState({data: {movies: data.data.results}})});
    }

    calculatePagination = (data) => {
      const currentPage = data.page;
      const previousPage = data.page === 1 ? data.page : data.page - 1;
      const nextPage = data.page === data.total_pages ? data.page : data.page + 1;
      return {nextPage, currentPage, previousPage}
    }

    listGenres = () => {
      fetch('http://localhost:3001/genres')
        .then((response) => response.json())
        .then((data) => {
          this.setState({genres: data.data.genres})});
      document.getElementById("genreDropdown").classList.toggle("show");
    }

    showGenre = (genreId) => {
      this.setState({genreId})
      document.getElementById("genreDropdown").classList.toggle("show");
      fetch(`http://localhost:3001/search/genre/${genreId}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({data: {movies: data.data.results}})
          this.setState({currentQuery: `http://localhost:3001/search/genre/${genreId}`})
        })
    }
  
    searchByTitle = (message) => {
        if (message == null || message === '') {
            fetch('http://localhost:3001/')
                .then((response) => response.json())
                .then((data) => this.setState({data: {movies: data.data.results}}));
        } else {
            fetch(`http://localhost:3001/search/title/${message}`)
                .then((response) => response.json())
                .then((data) => this.setState({data: {movies: data.data.results}}));
        }
    }

    getAnotherPage = (direction) => {
      let newPage = this.state.pagination.nextPage;
      if (direction === 'backward') newPage = this.state.pagination.previousPage;
      let endpointToFetch = `http://localhost:3001/?page=${newPage}`;
      if (this.state.genreId != null) {
        endpointToFetch = `http://localhost:3001/search/genre/${this.state.genreId}?page=${newPage}`
      }
      fetch(endpointToFetch)
        .then((response) => response.json())
        .then((data) => {
          this.setState({data: {movies: data.data.results}})
          const pagination = this.calculatePagination(data.data);
          this.setState({pagination});
        });
    }
  
    render() {
      const {data, genres} = this.state;
      return (
          <div>
            <div>
              <input
                type="text"
                onChange={input => this.setState({message: input.target.value})}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.searchByTitle(this.state.message)
                  }
                }}
                placeholder="Search for a movie by title"
                style={{width: "200px"}}
              />
              <button onClick={() => this.searchByTitle(this.state.message)}>
                Search
              </button>
            </div>
            <div>Or</div>
            <div className="dropdown">
              <button onClick={() => this.listGenres()} className="dropbtn">Select a genre</button>
              <div id="genreDropdown" className="dropdown-content">
                {(genres == null || genres.length <= 0)
                  ? '...'
                  : genres.map((genre) => (<li onClick={() => this.showGenre(genre.id)}>{genre.name}</li>))}
              </div>
            </div>
            <div className="MostPopular">
            <h2>Current Most Popular Movies</h2>
            <ul>
              {
                (data.movies == null || data.movies.length <= 0)
                  ? "Loading movies..."
                  : data.movies.map((movie) => (
                <li key={movie.id}>
                  <span>
                    <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                  </span><br />
                </li>
              ))}
            </ul>
            <br />
            <div className="navigation">
              <button onClick={() => {this.getAnotherPage('backward')}}>Get Previous Page</button>
              <button onClick={() => {this.getAnotherPage('forward')}}>Get Next Page</button>
            </div>
            </div>
          </div>
      );
    }
  }

  export default MostPopular;