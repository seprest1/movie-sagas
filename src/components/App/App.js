import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'

function App() {
  return (
    <div className="app">
      <div className ="wrapper">
      <header className="sign">
        <h1 >Now Showing:</h1>
      </header>
      <Router>        
        <Route path="/" exact>
          <MovieList className="movies"/>
        </Route>
        {/* Details page */}
        {/* Add Movie page */}
      </Router>
      </div>
    </div>
  );
}


export default App;
