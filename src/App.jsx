import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddShop from './screen/AddShop';
import ShopList from './screen/ShopList';
import Home from './screen/Home/Home';
import UpdateShop from './screen/UpdateShop';
import DemoShop from './screen/Demo/DemoShop';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoDress from './screen/Demo/DemoDress';
import DemoShoe from './screen/Demo/DemoShoe';
import Demobag from './screen/Demo/DemoBag';
import DemoCard from './screen/Demo/DemoCard';
import DemoSaloon from './screen/Demo/DemoSaloon';
import DemoPhone from './screen/Demo/DemoPhone';
import Contact from './screen/Pages/Contact';
import About from './screen/Pages/About';
import Service from './screen/Pages/Service';
import WebService from './screen/WebService';
import Systems from './screen/Pages/Systems';
import AddRest from './screen/Resturant/AddRest';
import RestaurantMenu from './screen/Resturant/RestaurantMenu';
import AddMenuItem from './screen/Resturant/AddMenuItem';
import EditMenuItem from './screen/Resturant/EditMenuItem';
// import CustomerLanding from './screen/Resturant/CustomerLanding';
import CustomerMenu from './screen/Resturant/CustomerMenu';
import AllReviews from './screen/Resturant/AllReviews';
import AddReview from './screen/Resturant/AddReview';
import AllRestaurants from './screen/Resturant/AllRestaurants';
import AllMenus from './screen/Resturant/AllMenus';
import PremiumLanding from './screen/Resturant/PremiumLanding';
import PremiumAllRestaurants from './screen/Resturant/PremiumAllRestaurants';
import PremiumAllMenus from './screen/Resturant/PremiumAllMenus';
import RestaurantLogin from './screen/Resturant/RestaurantLogin';
import RestaurantDashboard from './screen/Resturant/RestaurantDashboard';

import './App.css';

// List of restaurant routes where header and footer should be hidden
const RESTAURANT_ROUTES = [
  '/addrest',
  '/restaurant/menu',
  '/restaurant/menu/add',
  '/restaurant/menu/edit',
  // '/restaurant/customer/landing',
  '/restaurant/customer/menu',
  '/restaurant/customer/reviews',
  '/restaurant/customer/review/add',
  '/restaurant/all',
  '/restaurant/all-menus',
  '/premium',
  '/premium/restaurants',
  '/premium/menus',
  '/restaurant/login',
  '/restaurant/dashboard'
];

// Helper function to check if current path is a restaurant route
const isRestaurantRoute = (pathname) => {
  return RESTAURANT_ROUTES.some(route => 
    pathname.startsWith(route) || 
    pathname.startsWith('/restaurant') || 
    pathname.startsWith('/premium')
  );
};

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Create a custom event listener for navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const showDefaultHeader = !isRestaurantRoute(currentPath);
  const showDefaultFooter = !isRestaurantRoute(currentPath);

  return (
    <Router>
      <div className="App">
        {/* Conditional Header */}
        {showDefaultHeader && <Header />}

        <Routes>
          {/* Regular Routes */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/Shop-List" element={<ShopList />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/update-shop/:id" element={<UpdateShop />} />
          <Route path="/home" element={<Home />} />
          <Route path="/demodress" element={<DemoDress />} />
          <Route path="/demoshop" element={<DemoShop />} />
          <Route path="/demoshoe" element={<DemoShoe />} />
          <Route path="/demobag" element={<Demobag />} />
          <Route path="/democard" element={<DemoCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/demophone" element={<DemoPhone />} />
          <Route path="/webservice" element={<WebService />} />
          <Route path="/demosaloon" element={<DemoSaloon />} />
          <Route path="/systems" element={<Systems />} />

          {/* Restaurant Routes */}
          <Route path="/addrest" element={<AddRest />} />
          <Route path="/restaurant/login" element={<RestaurantLogin />} />
          <Route path="/restaurant/menu" element={<RestaurantMenu />} />
          <Route path="/restaurant/menu/add" element={<AddMenuItem />} />
          <Route path="/restaurant/menu/edit/:id" element={<EditMenuItem />} />
          {/* <Route path="/restaurant/customer/landing/:restaurantId" element={<CustomerLanding />} /> */}
          <Route path="/restaurant/customer/menu/:restaurantId" element={<CustomerMenu />} />
          <Route path="/restaurant/customer/reviews/:restaurantId" element={<AllReviews />} />
          <Route path="/restaurant/customer/review/add/:restaurantId" element={<AddReview />} />
          <Route path="/restaurant/all" element={<AllRestaurants />} />
          <Route path="/restaurant/all-menus" element={<AllMenus />} />
          <Route path="/premium" element={<PremiumLanding />} />
          <Route path="/premium/restaurants" element={<PremiumAllRestaurants />} />
          <Route path="/premium/menus" element={<PremiumAllMenus />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

        {/* Conditional Footer */}
        {showDefaultFooter && <Footer />}
      </div>
    </Router>
  );
}

export default App;