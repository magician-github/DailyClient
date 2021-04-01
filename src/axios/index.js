import axios from 'axios'
const instance = axios.create({
    // baseURL: 'localhost:9000',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  instance.interceptors.request.use(config => {
    config.headers.authorization = window.localStorage.getItem('token');
    return config;
  });
export default instance