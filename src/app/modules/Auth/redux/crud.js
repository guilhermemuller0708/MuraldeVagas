import api from 'app/services/api';

const URL_API_RELOAD = '/usuarios';
const URL_API_LOGIN = '/login';
const URL_API_SIGNUP = '/signup';

const login = (user) => {
  return api.post(URL_API_LOGIN, user);
};

const signUp = (user) => {
  return api.post(URL_API_SIGNUP, user);
};

const userByToken = ({ token }) => {
  return api.get(`${URL_API_RELOAD}/5`, {
    headers: {
      Authorization: token
    }
  });
};

const userById = ({ token, userId }) => {
  return api.get(`${URL_API_RELOAD}/${userId}`, {
    headers: {
      Authorization: token
    }
  });
};

export { login, signUp, userByToken, userById };
