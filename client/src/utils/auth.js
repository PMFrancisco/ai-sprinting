export const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
};