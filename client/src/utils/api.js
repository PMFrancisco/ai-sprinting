import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchData(endpoint, method = 'GET', body = null, headers = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = getToken();
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}