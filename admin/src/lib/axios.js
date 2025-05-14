import axios from 'axios';
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const STORAGE_PREFIX = 'face-track-';

http.interceptors.request.use(
  config => {
    let authUser = sessionStorage.getItem(`${STORAGE_PREFIX}auth-user`);
    if (authUser) {
      authUser = JSON.parse(authUser);
      if (authUser.token) {
        config.headers.Authorization = `Bearer ${authUser.token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.status === 401 ||
      (error.response && error.response.status === 401)
    ) {
      //   dispatch(setError(error));
      console.error('401 Auth Error');
      if (confirm('Your login session has been expired. Please re-login')) {
        console.log('Re-login');
        sessionStorage.removeItem(`${STORAGE_PREFIX}auth-user`);
        window.location.reload(true);
      }
      return Promise.reject(error);
    } else {
      //   showToast({
      //     type: 'error',
      //     message:
      //       error.response?.data?.error?.message ||
      //       (typeof error.response?.data === 'object' &&
      //       Object.values(error.response.data).filter(
      //         item => typeof item === 'string',
      //       ).length > 0
      //         ? Object.values(error.response.data)
      //             .filter(item => typeof item === 'string')
      //             .join(', ')
      //         : error.message) ||
      //       'An unknown error occurred!',
      //   });
      return Promise.reject(error);
    }
  },
);

export default http;
