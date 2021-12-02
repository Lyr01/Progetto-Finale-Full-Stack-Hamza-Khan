import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Post from './components/Post/Post';

function App() {

  return (
    <div className="App">
      <Router>
      <div className="navbar">
          <Navbar />
        </div>
        <Routes>
        <Route path="/" exact element={<HomePage/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/post/:postid" exact element={<Post/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
