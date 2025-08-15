// API utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  }
  return null;
};

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    sessionStorage.clear();
  }
};

export const makeAuthenticatedRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  console.log('Making request with token:', token ? 'Present' : 'Missing');
  console.log('Request headers:', headers);

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

// Auth API functions
export const registerUser = async (name: string, email: string, password: string, role: 'buyer' | 'seller') => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  const result = await response.json();
  
  if (response.ok && result.status === 'success') {
    // Store the token
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('userData', JSON.stringify(result.data));
    return result;
  } else {
    throw new Error(result.message || 'Registration failed');
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  
  if (response.ok && result.status === 'success') {
    // Store the token
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('userData', JSON.stringify(result.data));
    return result;
  } else {
    throw new Error(result.message || 'Login failed');
  }
};

export const deleteUserProfile = async (): Promise<void> => {
  const token = getAuthToken();
  console.log('Delete profile - Token check:', token ? 'Token exists' : 'No token found');
  
  if (!token) {
    throw new Error('No authentication token found. Please log in again.');
  }

  const response = await makeAuthenticatedRequest('/users/profile', {
    method: 'DELETE',
  });

  console.log('Delete profile response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Delete profile error data:', errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  console.log('Profile deleted successfully');
};

// Debug function to check auth status
export const debugAuth = () => {
  const token = getAuthToken();
  const userData = getUserData();
  console.log('Auth Debug:');
  console.log('- Token:', token ? `${token.substring(0, 20)}...` : 'Not found');
  console.log('- User Data:', userData);
  console.log('- localStorage keys:', Object.keys(localStorage || {}));
  return { token: !!token, userData };
};
