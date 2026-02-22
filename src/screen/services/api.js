import axios from 'axios';

// UPDATE THIS LINE - Use your live domain
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',  // ✅ Changed from localhost:3000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store authentication data
let authToken = localStorage.getItem('authToken');
let currentRestaurant = null;

// Parse restaurant data from localStorage
try {
  const storedRestaurant = localStorage.getItem('currentRestaurant');
  if (storedRestaurant && storedRestaurant !== 'undefined') {
    currentRestaurant = JSON.parse(storedRestaurant);
  }
} catch (e) {
  console.error('Error parsing restaurant data:', e);
  localStorage.removeItem('currentRestaurant');
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = '/restaurant/login';
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication functions
export const setAuthToken = (token) => {
  authToken = token;
  localStorage.setItem('authToken', token);
};

export const setCurrentRestaurant = (restaurant) => {
  if (!restaurant) {
    console.error('Attempted to set null/undefined restaurant');
    return;
  }
  
  if (!restaurant.restaurantId && restaurant._id) {
    restaurant.restaurantId = restaurant._id;
  }
  
  currentRestaurant = restaurant;
  localStorage.setItem('currentRestaurant', JSON.stringify(restaurant));
  console.log('Restaurant stored:', restaurant);
};

export const getCurrentRestaurant = () => {
  if (!currentRestaurant) {
    try {
      const stored = localStorage.getItem('currentRestaurant');
      if (stored && stored !== 'undefined') {
        currentRestaurant = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error getting restaurant from localStorage:', e);
    }
  }
  return currentRestaurant;
};

export const getRestaurantId = () => {
  const restaurant = getCurrentRestaurant();
  if (!restaurant) return null;
  
  const id = restaurant.restaurantId || restaurant._id || restaurant.id;
  console.log('getRestaurantId returning:', id);
  return id;
};

export const clearAuth = () => {
  authToken = null;
  currentRestaurant = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentRestaurant');
};

export const isAuthenticated = () => {
  const token = authToken || localStorage.getItem('authToken');
  const restaurant = getCurrentRestaurant();
  return !!(token && restaurant);
};

// Restaurant APIs
export const restaurantAPI = {
  register: (data) => api.post('/restaurant', data),
  login: (data) => api.post('/restaurant/login', data),
  getAll: () => api.get('/restaurant/get'),
  getById: (id) => api.get(`/restaurant/${id}`),
  update: (id, data) => api.put(`/restaurant/${id}`, data),
  delete: (id) => api.delete(`/restaurant/${id}`),
};

// Menu APIs
export const menuAPI = {
  add: (data) => api.post('/menu', data),
  getAll: () => api.get('/menu/get'),
  getByRestaurant: (restaurantId) => {
    if (!restaurantId) {
      console.error('getByRestaurant called with undefined restaurantId');
      return Promise.reject(new Error('Restaurant ID is required'));
    }
    return api.get(`/menu/restaurant/${restaurantId}`);
  },
  getById: (id) => api.get(`/menu/${id}`),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

// Review APIs
export const reviewAPI = {
  add: (data) => api.post('/reviews', data),
  getAll: () => api.get('/reviews/get'),
  getByRestaurant: (restaurantId) => {
    if (!restaurantId) {
      console.error('getByRestaurant called with undefined restaurantId');
      return Promise.reject(new Error('Restaurant ID is required'));
    }
    return api.get(`/reviews/restaurant/${restaurantId}`);
  },
  getById: (id) => api.get(`/reviews/${id}`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export default api;