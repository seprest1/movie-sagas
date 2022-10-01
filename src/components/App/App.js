import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

//components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="app">
      <div className ="wrapper">
      <Router>        
          <Route exact path="/">
            <MovieList className="movies"/>
          </Route>
          <Route exact path="/details/:id">
            <Details/>
          </Route>
          <Route exact path="/add_movie">
            <AddMovie/>
          </Route>
      </Router>
      </div>
    </div>
  );
}


export default App;
