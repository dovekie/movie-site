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
        .then((data) => this.setState({data: data.data.results}));
    }
  
    searchByTitle = (message) => {
        if (message == null || message === '') {
            fetch('http://localhost:3001/')
                .then((response) => response.json())
                .then((data) => this.setState({data: data.data.results}));
        } else {
            fetch(`http://localhost:3001/search/title/${message}`)
                .then((response) => response.json())
                .then((data) => this.setState({data: data.data.results}));
        }
    }
  
    render() {
      const {data} = this.state;
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
                placeholder="Enter a movie title"
                style={{width: "200px"}}
              />
              <button onClick={() => this.searchByTitle(this.state.message)}>
                SEARCH
              </button>
            </div>
            <div className="MostPopular">
            <h2>Current Most Popular Movies</h2>
            <ul>
              {
                data.length <= 0
                  ? "Loading movies..."
                  : data.map((movie) => (
                <li key={movie.id}>
                  <span>
                    <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                  </span><br />
                </li>
              ))}
            </ul>
            </div>
          </div>
      );
    }
  }

  export default MostPopular;