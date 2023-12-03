import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import User from './pages/User';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Hero />} />
          <Route path='/users' exact element={<User />} />
          <Route path='/create-users' exact element={<CreateUser/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
