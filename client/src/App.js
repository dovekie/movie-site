import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Movie from './Movie';
import MostPopular from './MostPopular';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={MostPopular}/>
        <Route path="/movie/:id" component={Movie}/>
      </Router>
    );
  }
}

export default App;
