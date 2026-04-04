export const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://stackmastery.onrender.com';

export const fetchWithAuth = async (uri: string, options: RequestInit = {}) => {
  const url = uri.startsWith('http') ? uri : `${API_BASE_URL}${uri}`;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Optionally redirect to login or clear token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }

  return response;
};
