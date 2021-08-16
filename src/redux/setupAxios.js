export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(window.localStorage.getItem('authToken'));
      if (user?.token) {
        config.headers.Authorization = user.token;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      console.error(err);

      return Promise.reject(err);
    }
  );
}
