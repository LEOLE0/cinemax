import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import Home4 from './Pages/Home4';
import Home5 from './Pages/Home5';
import Home6 from './Pages/Home6';
import Home7 from './Pages/Home7';
import GalleryPage from './Pages/GalleryPage';
import MoviePage from './Pages/MoviePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home2" element={<Home2 />} />
        <Route exact path="/home4" element={<Home4 />} />
        <Route exact path="/home5" element={<Home5 />} />
        <Route exact path="/home6" element={<Home6 />} />
        <Route exact path="/home7" element={<Home7 />} />
        <Route path="/GalleryPage" element={<GalleryPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
