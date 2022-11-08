export const apiEndpoints = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  userById: (id: string) => `/api/users/${id}`,
};
