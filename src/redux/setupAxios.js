export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { user }
      } = store.getState();

      config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5lbWFpbCIsImp0aSI6IjUiLCJleHAiOjE2MjkxMzkwNzB9.-VRuK1lz0xM6-5i5wk7QqLzzY1Cv6sMNcZ792l4vMTEC7hrzFHgKzxP0lh64gGSQ0zNI05b4NhUOYBvKpNn2Bg`;

      if (user?.token) {
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5lbWFpbCIsImp0aSI6IjUiLCJleHAiOjE2MjkxMzkwNzB9.-VRuK1lz0xM6-5i5wk7QqLzzY1Cv6sMNcZ792l4vMTEC7hrzFHgKzxP0lh64gGSQ0zNI05b4NhUOYBvKpNn2Bg`;
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
