// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddShop from './screen/AddShop';
import ShopList from './screen/ShopList';
import Home from './screen/Home';
import UpdateShop from './screen/UpdateShop';
import Header from './components/Header'; // Import Header
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header appears on all pages */}
        <Header />
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/Shop-List" element={<ShopList />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/update-shop/:id" element={<UpdateShop />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;