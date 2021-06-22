export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { user },
      } = store.getState();

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
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
