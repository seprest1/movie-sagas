import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

//components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import Header from '../Header/Header'

function App() {
  return (
    <div className="app">
      <div className ="wrapper">
      <Router> 
          <Header />
          <Route exact path="/">
            <MovieList className="appBody"/>
          </Route>
          <Route exact path="/details/:id">
            <Details className="appBody"/>
          </Route>
          <Route exact path="/add_movie">
            <AddMovie className="appBody"/>
          </Route>
      </Router>
      </div>
    </div>
  );
}


export default App;
