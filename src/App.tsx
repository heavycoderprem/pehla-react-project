import React from 'react';

import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import {Main} from "./pages/main/main";
import {Login} from "./pages/login";
import {Navbar} from "./components/navbar";
import {CreatePost} from "./pages/create-post/CreatePost";
import './App.css';



function App() {
  return (
    <div className="App">
  <Router>
    <Navbar/>
    <Routes>
      <Route path = "/" element={<Main/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
