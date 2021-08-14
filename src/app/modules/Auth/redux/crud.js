import api from 'app/services/api';

const BASE_URL_API = '/auth';
const URL_API_LOGIN = '/login';
const URL_API_SIGNUP = '/signup';

const login = (user) => {
  return api.post(URL_API_LOGIN, user);
};

const signUp = (user) => {
  return api.post(URL_API_SIGNUP, user);
};

const userByToken = ({ token }) => {
  return api.get(`${BASE_URL_API}/`, {
    data: { id: 5 },
    headers: {
      Authorization: token
    }
  });
};

export { login, signUp, userByToken };
