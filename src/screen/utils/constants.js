// Color palette based on logo
export const COLORS = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#3b82f6',
  secondary: '#ff6b35',
  secondaryDark: '#e55a2b',
  secondaryLight: '#ff8c5a',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
  dark: '#1f2937',
  light: '#f3f4f6',
  white: '#ffffff',
  gray: '#6b7280',
  grayLight: '#9ca3af',
  grayDark: '#4b5563',
};

export const SERVICE_PACKAGES = {
  personal: [
    { id: 1, name: 'POS System', description: 'Complete Point of Sale system for retail businesses', price: '$99/month', icon: '🛒' },
    { id: 2, name: 'Personal Financial Tracker', description: 'Track your expenses and manage budget', price: '$29/month', icon: '💰' },
    { id: 3, name: 'Post Design', description: 'Professional social media post designs', price: '$49/post', icon: '🎨' },
    { id: 4, name: 'Website Development', description: 'Custom website development services', price: 'Starting $999', icon: '🌐' },
    { id: 5, name: 'Software Development', description: 'Custom software solutions', price: 'Custom pricing', icon: '💻' },
  ],
  business: [
    { id: 1, name: 'Enterprise POS System', description: 'Complete POS with inventory management', price: '$199/month', icon: '🏪' },
    { id: 2, name: 'Business Analytics', description: 'Advanced analytics and reporting', price: '$149/month', icon: '📊' },
    { id: 3, name: 'CRM Integration', description: 'Customer relationship management', price: '$129/month', icon: '👥' },
    { id: 4, name: 'E-commerce Solution', description: 'Complete online store setup', price: '$499 one-time', icon: '🛍️' },
    { id: 5, name: 'Mobile App Development', description: 'iOS and Android app development', price: 'Starting $2999', icon: '📱' },
  ],
};

export const DASHBOARD_TABS = {
  personal: [
    { id: 'profile', label: 'Edit Profile', icon: '👤' },
    { id: 'password', label: 'Reset Password', icon: '🔒' },
    { id: 'packages', label: 'Service Packages', icon: '📦' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'my-packages', label: 'My Packages', icon: '🎁' },
  ],
  business: [
    { id: 'profile', label: 'Edit Profile', icon: '👤' },
    { id: 'password', label: 'Reset Password', icon: '🔒' },
    { id: 'packages', label: 'Service Packages', icon: '📦' },
    { id: 'agreement', label: 'Agreement', icon: '📄' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'hold-working', label: 'Hold Working', icon: '⏸️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'my-packages', label: 'My Packages', icon: '🎁' },
  ],
};