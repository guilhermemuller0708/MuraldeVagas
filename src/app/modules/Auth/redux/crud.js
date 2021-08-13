import api from 'app/services/api';

const BASE_URL_API = '/auth';

const login = (user) => {
  return api.post(`${BASE_URL_API}/signin`, user);
};

const signUp = (user) => {
  return api.post(`${BASE_URL_API}/signup`, user);
};

const userByToken = (token) => {
  return api.get(`${BASE_URL_API}/`);
};

export { login, signUp, userByToken };
