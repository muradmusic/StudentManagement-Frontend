
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Students } from './components/Students';
import { Courses } from './components/Courses';


function App() {
  return (
    <Router>
      <div className="App container" style={{marginTop:'10px'}}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/">Students</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses">Courses</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/' element={< Students />}></Route>
          <Route exact path='/courses' element={< Courses />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
