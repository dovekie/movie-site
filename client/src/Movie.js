import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Movie extends Component {
    state = {
        data: [],
    };
    componentDidMount() {
        fetch(`http://localhost:3001/search/id/${this.props.match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({data: data.data}));
    }

  render() {
    const {data} = this.state;
    return (
        <div>
          <div className="Movie">
            <img alt={`poster for ${data.title}`} src={`http://image.tmdb.org/t/p/w185/${data.poster_path}`}/><br />
            <span>Title: {data.title}</span><br />
            <span>Summary: {data.overview}</span><br />
            <span>Runtime: {data.runtime} minutes</span><br />
            <span></span><br />
            <Link to={'/'}>Back</Link>
          </div>
        </div>
    );
  }
}

export default Movie;
