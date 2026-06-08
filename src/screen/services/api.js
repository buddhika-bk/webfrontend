import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SERVER_URL   = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const isAuth = ['/login','/register','/forgot-password','/reset-password']
        .some(p => err.config.url?.includes(p));
      if (!isAuth) {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        if (!window.location.pathname.includes('/login')) window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export const getServerUrl = () => SERVER_URL;

// Auth helpers
export const setUserAuth = (token, user) => {
  if (token) localStorage.setItem('token', token);
  if (user)  localStorage.setItem('currentUser', JSON.stringify(user));
};
export const clearUserAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};
export const getUser = () => {
  try { const s = localStorage.getItem('currentUser'); return s ? JSON.parse(s) : null; } catch { return null; }
};
export const isUserAuthenticated = () => !!(localStorage.getItem('token') && getUser());
export const getUserType         = () => getUser()?.userType || null;
export const isAdmin             = () => getUserType() === 'admin';
export const getDashboardRoute   = () => {
  const t = getUserType();
  if (t === 'personal') return '/personal/dashboard';
  if (t === 'business') return '/business/dashboard';
  if (t === 'admin')    return '/admin/dashboard';
  return '/login';
};

// Restaurant helpers
export const setRestaurantAuth = (token, restaurant) => {
  localStorage.setItem('authToken', token);
  if (restaurant) localStorage.setItem('currentRestaurant', JSON.stringify(restaurant));
};
export const clearRestaurantAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentRestaurant');
};
export const getCurrentRestaurant = () => {
  try { const s = localStorage.getItem('currentRestaurant'); return s ? JSON.parse(s) : null; } catch { return null; }
};
export const getRestaurantId = () => {
  const r = getCurrentRestaurant();
  return r?.restaurantId || r?._id || r?.id || null;
};
export const isRestaurantAuthenticated = () => !!(localStorage.getItem('authToken') && getCurrentRestaurant());
export const clearAllAuth = () => { clearUserAuth(); clearRestaurantAuth(); };

// ── USER API ──────────────────────────────────────────
export const userAPI = {
  register:       (data)        => api.post('/users/register', data),
  login:          (email, pass) => api.post('/users/login', { email, password: pass }),
  forgotPassword: (email)       => api.post('/users/forgot-password', { email }),
  resetPassword:  (token, pw)   => api.put(`/users/reset-password/${token}`, { password: pw }),
  verifyEmail:    (token)       => api.get(`/users/verify-email/${token}`),
  getMe:          ()            => api.get('/users/me'),
  updateProfile:  (data)        => api.put('/users/profile', data),
  updatePassword: (cur, nw)     => api.put('/users/password', { currentPassword: cur, newPassword: nw }),
  getAllUsers:     (params)      => api.get('/users', { params }),
  getUserById:    (id)          => api.get(`/users/${id}`),
  updateUser:     (id, data)    => api.put(`/users/${id}`, data),
  deleteUser:     (id)          => api.delete(`/users/${id}`),
  getUserStats:   ()            => api.get('/users/stats/dashboard'),
};

// ── CHAT API ──────────────────────────────────────────
export const chatAPI = {
  getConversation:       ()              => api.get('/chat/conversation'),
  getMessages:           ()              => api.get('/chat/messages'),
  sendMessage:           (content)       => api.post('/chat/messages', { content }),
  poll:                  (since)         => api.get('/chat/poll', { params: { since } }),
  adminGetConversations: ()              => api.get('/chat/admin/conversations'),
  adminGetMessages:      (userId)        => api.get(`/chat/admin/${userId}/messages`),
  adminSendMessage:      (userId, cont)  => api.post(`/chat/admin/${userId}/send`, { content: cont }),
  adminPoll:             (userId, since) => api.get(`/chat/admin/${userId}/poll`, { params: { since } }),
};

// ── PACKAGES API ──────────────────────────────────────
export const packagesAPI = {
  // User
  getMyPackages:   ()              => api.get('/packages/my'),
  getMyPackage:    (id)            => api.get(`/packages/my/${id}`),
  respondAgreement:(id, formData)  => api.post(`/packages/my/${id}/agree`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  submitPayRef:    (id, data)      => api.post(`/packages/my/${id}/pay-ref`, data),
  // Admin
  adminGetAll:          (params)   => api.get('/packages/admin', { params }),
  adminGetOne:          (id)       => api.get(`/packages/admin/${id}`),
  adminCreate:          (data)     => api.post('/packages/admin', data),
  adminUpdateProgress:  (id, data) => api.put(`/packages/admin/${id}/progress`, data),
  adminAddInvoice:      (id, data) => api.post(`/packages/admin/${id}/invoice`, data),
  adminConfirmPayment:  (id, data) => api.post(`/packages/admin/${id}/pay-confirm`, data),
  adminAddAgreement:    (id, fd)   => api.post(`/packages/admin/${id}/agreement`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  adminUpdateHold:      (id, data) => api.put(`/packages/admin/${id}/hold`, data),
  adminDelete:          (id)       => api.delete(`/packages/admin/${id}`),
};

// ── RESTAURANT API ────────────────────────────────────
export const restaurantAPI = {
  register: (data)     => api.post('/v1/restaurant', data),
  login:    (data)     => api.post('/v1/restaurant/login', data),
  getAll:   ()         => api.get('/v1/restaurant/get'),
  getById:  (id)       => api.get(`/v1/restaurant/${id}`),
  update:   (id, data) => api.put(`/v1/restaurant/${id}`, data),
  delete:   (id)       => api.delete(`/v1/restaurant/${id}`),
};

export const menuAPI = {
  add:             (data)    => api.post('/v1/menu', data),
  getAll:          ()        => api.get('/v1/menu/get'),
  getByRestaurant: (rId)     => api.get(`/v1/menu/restaurant/${rId}`),
  getById:         (id)      => api.get(`/v1/menu/${id}`),
  update:          (id, d)   => api.put(`/v1/menu/${id}`, d),
  delete:          (id)      => api.delete(`/v1/menu/${id}`),
};

export const reviewAPI = {
  add:             (data)  => api.post('/v1/reviews', data),
  getAll:          ()      => api.get('/v1/reviews/get'),
  getByRestaurant: (rId)   => api.get(`/v1/reviews/restaurant/${rId}`),
  getById:         (id)    => api.get(`/v1/reviews/${id}`),
  update:          (id, d) => api.put(`/v1/reviews/${id}`, d),
  delete:          (id)    => api.delete(`/v1/reviews/${id}`),
};

export const shopAPI = {
  getAll:  ()        => api.get('/v1/shop'),
  getById: (id)      => api.get(`/v1/shop/${id}`),
  create:  (data)    => api.post('/v1/shop', data),
  update:  (id, d)   => api.put(`/v1/shop/${id}`, d),
  delete:  (id)      => api.delete(`/v1/shop/${id}`),
};

export default api;