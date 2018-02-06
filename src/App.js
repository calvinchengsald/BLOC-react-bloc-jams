import React, { Component } from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom';

 import Landing from './components/Landing';
 import Library from './components/Library';
 import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Bloc Jams </h1>
          <nav className="btn-group btn-group-lg">
            <Link to='/'> <button type="button" className="btn"> Home </button></Link>
            <Link to='/Library'> <button type="button" className="btn"> Library </button></Link>
            <Link to='/Album/'> <button type="button" className="btn"> Album </button></Link>
          </nav>
        </header>
        <main>
          <Route exact path = "/" component = {Landing}/>
          <Route path = "/library" component = {Library}/>
          <Route path="/album/:slug" component={Album} />
        </main>


      </div>
    );
  }
}

export default App;

/*
imagine dragon its time
fallout boy centuries
too good at goodbye sam smith
*/
