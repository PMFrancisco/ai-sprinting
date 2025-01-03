export const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};