export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { user }
      } = store.getState();

      if (user?.Authorization) {
        config.headers.Authorization = user.Authorization;
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
