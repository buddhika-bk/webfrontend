// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddShop from './screen/AddShop';
import ShopList from './screen/ShopList';
import Home from './screen/Home/Home';
import UpdateShop from './screen/UpdateShop';
import DemoShop from './screen/Demo/DemoShop'; // Uncomment this line
import Header from './components/Header';
import DemoDress from './screen/Demo/DemoDress'; // Import DemoDress component
import DemoShoe from './screen/Demo/DemoShoe'; // Import DemoShoe component
import Demobag from './screen/Demo/DemoBag'; // Import DemoBag component
import DemoCard from './screen/Demo/DemoCard'; // Import DemoCard component
import DemoSaloon from './screen/Demo/DemoSaloon';
import DemoPhone from './screen/Demo/DemoPhone';
import Contact from './screen/Pages/Contact';
import About from './screen/Pages/About';
import Service from './screen/Pages/Service';
import WebService from './screen/WebService';
import Systems from './screen/Pages/Systems'; // Import Systems component

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
          <Route path="/demodress" element={<DemoDress />} /> {/* Add this line */}
          <Route path="/demoshop" element={<DemoShop />} /> Uncomment this line
          <Route path="/demoshoe" element={<DemoShoe />} /> {/* Add this line */}
          <Route path="/demobag" element={<Demobag />} /> {/* Add this line */}
          <Route path="/democard" element={<DemoCard />} /> {/* Add this line */}
          <Route path="/about" element={<About />} /> {/* Add this line */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} /> {/* Add this line */}
          <Route path="/demophone" element={<DemoPhone />} /> {/* Add this line */}
          <Route path="/webservice" element={<WebService />} /> {/* Add this line */}
          <Route path="/demosaloon" element={<DemoSaloon />} /> {/* Add this line */}
          <Route path="/systems" element={<Systems />} /> {/* Add this line */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;