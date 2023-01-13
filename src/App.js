import React from 'react';
import './App.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';

import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import ListNFT from "./components/ListNFT";
import NFTPage from"./components/NFTPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Home />} />
          <Route exact path = "/profile" element={<Profile />} />
          <Route exact path = "/listnft" element={<ListNFT />} />
          <Route exact path = "/nftpage/:tokenid" element={<NFTPage />} />
        </Routes>

    </BrowserRouter>

  );
}

export default App;
