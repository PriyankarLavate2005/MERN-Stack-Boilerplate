import apiService from './api';

export const authService = {
  login: (credentials) => apiService.login(credentials),
  register: (userData) => apiService.register(userData),
  getProfile: () => apiService.getProfile()
};

export default authService;