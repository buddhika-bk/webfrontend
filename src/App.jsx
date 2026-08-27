import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import AddShop from './screen/AddShop';
import ShopList from './screen/ShopList';
import Home from './screen/Home/Home';
import UpdateShop from './screen/UpdateShop';

import DemoShop from './screen/Demo/DemoShop';
import DemoDress from './screen/Demo/DemoDress';
import DemoShoe from './screen/Demo/DemoShoe';
import Demobag from './screen/Demo/DemoBag';
import DemoCard from './screen/Demo/DemoCard';
import DemoSaloon from './screen/Demo/DemoSaloon';
import DemoPhone from './screen/Demo/DemoPhone';

import Header from './components/Header';
import Footer from './components/Footer';

import Contact from './screen/Pages/Contact';
import About from './screen/Pages/About';
import Service from './screen/Pages/Service';
import WebService from './screen/WebService';
import Systems from './screen/Pages/Systems';
import POSSystem from './screen/Pages/POSSystem';
import DigitalSolution from './screen/Pages/DigitalSolution';

import AddRest from './screen/Resturant/AddRest';
import RestaurantMenu from './screen/Resturant/RestaurantMenu';
import AddMenuItem from './screen/Resturant/AddMenuItem';
import EditMenuItem from './screen/Resturant/EditMenuItem';
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

import Portfolio from './screen/Pages/portfolio';
import ContactProfile from './screen/Pages/ContactProfile';
import VinuSaloon from './screen/Pages/Saloon';

import DashboadUi from './system/Dashboard';

// User Management Imports
import Login from './screen/Pages/auth/Login';
import Register from './screen/Pages/auth/Register';
import ForgotPassword from './screen/Pages/auth/ForgotPassword';
import ResetPassword from './screen/Pages/auth/ResetPassword';

import PersonalDashboard from './screen/Pages/personal/PersonalDashboard';
import BusinessDashboard from './screen/Pages/business/BusinessDashboard';

import AdminLogin from './screen/Pages/admin/AdminLogin';
import AdminDashboard from './screen/Pages/admin/AdminDashboard';
import AdminUsers from './screen/Pages/admin/AdminUsers';
import AdminUserDetails from './screen/Pages/admin/AdminUserDetails';

import { useAuth } from './context/AuthContext';
import UserHeader from './components/Layout/UserHeader';

// QR Profile Imports
import AddProfile from './screen/Pages/makeprofile/AddProfile';
import AllProfile from './screen/Pages/makeprofile/AllProfile';
import ViewProfile from './screen/Pages/makeprofile/ViewProfile';
import EditProfile from './screen/Pages/makeprofile/EditProfile';

import './App.css';


// ─────────────────────────────────────────────────────────────
// Protected Route
// ─────────────────────────────────────────────────────────────

const ProtectedRoute = ({ children, allowedTypes = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedTypes.length > 0 &&
    !allowedTypes.includes(user.userType)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};


// ─────────────────────────────────────────────────────────────
// Dashboard Layout
// UserHeader only
// No default Header / Footer
// ─────────────────────────────────────────────────────────────

const UserDashboardLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <UserHeader />

      <div className="dashboard-main">
        {children}
      </div>
    </>
  );
};


// ─────────────────────────────────────────────────────────────
// Routes that hide BOTH default Header and Footer
// ─────────────────────────────────────────────────────────────

const ROUTES_WITHOUT_LAYOUT = [
  // Restaurant Routes
  '/addrest',
  '/restaurant/menu',
  '/restaurant/menu/add',
  '/restaurant/menu/edit',
  '/restaurant/customer/menu',
  '/restaurant/customer/reviews',
  '/restaurant/customer/review/add',
  '/restaurant/all',
  '/restaurant/all-menus',
  '/premium',
  '/premium/restaurants',
  '/premium/menus',
  '/restaurant/login',
  '/restaurant/dashboard',

  // Portfolio
  '/portfolio',

  // Contact Profile
  '/contact-profile',

  // Saloon
  '/vinusaloon'
];


// ─────────────────────────────────────────────────────────────
// Check routes without Header + Footer
// ─────────────────────────────────────────────────────────────

const isRouteWithoutLayout = (pathname) => {
  return ROUTES_WITHOUT_LAYOUT.some(
    route =>
      pathname.startsWith(route) ||
      pathname.startsWith('/restaurant') ||
      pathname.startsWith('/premium')
  );
};


// ─────────────────────────────────────────────────────────────
// Routes that hide ONLY Footer
// Dashboard UI keeps the normal Header
// ─────────────────────────────────────────────────────────────

const isFooterHiddenRoute = (pathname) => {
  return pathname.startsWith('/dashboard-ui');
};


// ─────────────────────────────────────────────────────────────
// Dashboard / Admin Routes
// These use UserHeader
// ─────────────────────────────────────────────────────────────

const isDashboardRoute = (pathname) => {
  return (
    pathname.startsWith('/personal') ||
    pathname.startsWith('/business') ||
    pathname.startsWith('/admin')
  );
};


// ─────────────────────────────────────────────────────────────
// Authentication Routes
// Header visible
// Footer hidden
// ─────────────────────────────────────────────────────────────

const isAuthRoute = (pathname) => {
  return (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')
  );
};


// ─────────────────────────────────────────────────────────────
// Scroll To Top
// ─────────────────────────────────────────────────────────────

const ScrollToTop = () => {
  const location = useLocation();

  React.useEffect(() => {
    const scrollToSection = () => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      if (location.hash) {

        const target = document.querySelector(
          location.hash
        );

        if (target) {

          setTimeout(() => {

            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

          }, 50);

        }
      }
    };

    scrollToSection();

  }, [
    location.pathname,
    location.hash
  ]);

  return null;
};


// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────

function App() {

  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname
  );


  // ───────────────────────────────────────────────────────────
  // Detect URL changes
  // ───────────────────────────────────────────────────────────

  React.useEffect(() => {

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };


    window.addEventListener(
      'popstate',
      handleLocationChange
    );


    const originalPushState =
      window.history.pushState;


    window.history.pushState = function () {

      originalPushState.apply(
        this,
        arguments
      );

      handleLocationChange();
    };


    return () => {

      window.removeEventListener(
        'popstate',
        handleLocationChange
      );

      window.history.pushState =
        originalPushState;

    };

  }, []);


  // ───────────────────────────────────────────────────────────
  // Header Visibility
  //
  // Dashboard UI:
  // ✅ Header visible
  // ───────────────────────────────────────────────────────────

  const showDefaultHeader =
    !isRouteWithoutLayout(currentPath) &&
    !isDashboardRoute(currentPath);


  // ───────────────────────────────────────────────────────────
  // Footer Visibility
  //
  // Dashboard UI:
  // ❌ Footer hidden
  // ───────────────────────────────────────────────────────────

  const showDefaultFooter =
    !isRouteWithoutLayout(currentPath) &&
    !isDashboardRoute(currentPath) &&
    !isAuthRoute(currentPath) &&
    !isFooterHiddenRoute(currentPath);


  return (
    <Router>

      <ScrollToTop />

      <div className="App">

        {/* ─────────────────────────────────────────────── */}
        {/* Default Header */}
        {/* ─────────────────────────────────────────────── */}

        {showDefaultHeader && <Header />}


        {/* ─────────────────────────────────────────────── */}
        {/* Application Routes */}
        {/* ─────────────────────────────────────────────── */}

        <Routes>

          {/* Default Redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />


          {/* ───────────────────────────────────────────── */}
          {/* Public Pages */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/service"
            element={<Service />}
          />

          <Route
            path="/webservice"
            element={<WebService />}
          />

          <Route
            path="/systems"
            element={<Systems />}
          />

          <Route
            path="/pos-system"
            element={<POSSystem />}
          />

          <Route
            path="/digital-solution"
            element={<DigitalSolution />}
          />

          <Route
            path="/portfolio"
            element={<Portfolio />}
          />

          <Route
            path="/vinusaloon"
            element={<VinuSaloon />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Dashboard UI */}
          {/* Header: YES */}
          {/* Footer: NO */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/dashboard-ui"
            element={<DashboadUi />}
          />


          {/* Contact Profile */}
          <Route
            path="/contact-profile"
            element={<ContactProfile />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Demo Pages */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/demoshop"
            element={<DemoShop />}
          />

          <Route
            path="/demodress"
            element={<DemoDress />}
          />

          <Route
            path="/demoshoe"
            element={<DemoShoe />}
          />

          <Route
            path="/demobag"
            element={<Demobag />}
          />

          <Route
            path="/democard"
            element={<DemoCard />}
          />

          <Route
            path="/demosaloon"
            element={<DemoSaloon />}
          />

          <Route
            path="/demophone"
            element={<DemoPhone />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Shop Management */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/Shop-List"
            element={<ShopList />}
          />

          <Route
            path="/add-shop"
            element={<AddShop />}
          />

          <Route
            path="/update-shop/:id"
            element={<UpdateShop />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Authentication */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Admin Login */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* Admin Dashboard */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                allowedTypes={['admin']}
              >
                <UserDashboardLayout>
                  <AdminDashboard />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />


          {/* Admin Users */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                allowedTypes={['admin']}
              >
                <UserDashboardLayout>
                  <AdminUsers />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />


          {/* Admin User Details */}
          <Route
            path="/admin/users/:id"
            element={
              <ProtectedRoute
                allowedTypes={['admin']}
              >
                <UserDashboardLayout>
                  <AdminUserDetails />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />


          {/* ───────────────────────────────────────────── */}
          {/* Personal Dashboard */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/personal/dashboard"
            element={
              <ProtectedRoute
                allowedTypes={['personal']}
              >
                <UserDashboardLayout>
                  <PersonalDashboard />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />


          {/* ───────────────────────────────────────────── */}
          {/* Business Dashboard */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/business/dashboard"
            element={
              <ProtectedRoute
                allowedTypes={['business']}
              >
                <UserDashboardLayout>
                  <BusinessDashboard />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />


          {/* ───────────────────────────────────────────── */}
          {/* Restaurant Routes */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/addrest"
            element={<AddRest />}
          />

          <Route
            path="/restaurant/login"
            element={<RestaurantLogin />}
          />

          <Route
            path="/restaurant/menu"
            element={<RestaurantMenu />}
          />

          <Route
            path="/restaurant/menu/add"
            element={<AddMenuItem />}
          />

          <Route
            path="/restaurant/menu/edit/:id"
            element={<EditMenuItem />}
          />

          <Route
            path="/restaurant/customer/menu/:restaurantId"
            element={<CustomerMenu />}
          />

          <Route
            path="/restaurant/customer/reviews/:restaurantId"
            element={<AllReviews />}
          />

          <Route
            path="/restaurant/customer/review/add/:restaurantId"
            element={<AddReview />}
          />

          <Route
            path="/restaurant/all"
            element={<AllRestaurants />}
          />

          <Route
            path="/restaurant/all-menus"
            element={<AllMenus />}
          />

          <Route
            path="/premium"
            element={<PremiumLanding />}
          />

          <Route
            path="/premium/restaurants"
            element={<PremiumAllRestaurants />}
          />

          <Route
            path="/premium/menus"
            element={<PremiumAllMenus />}
          />

          <Route
            path="/restaurant/dashboard"
            element={<RestaurantDashboard />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* QR Profile Routes */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="/add-profile"
            element={<AddProfile />}
          />

          <Route
            path="/all-profiles"
            element={<AllProfile />}
          />

          <Route
            path="/profile/:id"
            element={<ViewProfile />}
          />

          <Route
            path="/edit-profile/:id"
            element={<EditProfile />}
          />


          {/* ───────────────────────────────────────────── */}
          {/* 404 */}
          {/* ───────────────────────────────────────────── */}

          <Route
            path="*"
            element={
              <div>
                404 Not Found
              </div>
            }
          />

        </Routes>


        {/* ─────────────────────────────────────────────── */}
        {/* Default Footer */}
        {/* Dashboard UI does NOT display this */}
        {/* ─────────────────────────────────────────────── */}

        {showDefaultFooter && <Footer />}

      </div>

    </Router>
  );
}


export default App;