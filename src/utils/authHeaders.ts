import axios from 'axios';

export const authHeaders = {
  set(token: string) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  },
  delete() {
    delete axios.defaults.headers.common['Authorization'];
  },
};
