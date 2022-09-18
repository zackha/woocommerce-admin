const authProvider = {

  login: ({ username, password }) => {
    if (username !== 'demo' || password !== 'demo') {
      return Promise.reject();
    }
    localStorage.setItem('username', username);
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },

  checkAuth: () =>
    localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),

  checkError:  (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () =>
    Promise.resolve({
      id: 'user',
      fullName: 'Brooks Hatlen',
      avatar: '',
    }),

  getPermissions: () => Promise.resolve(''),
  
};

export default authProvider;