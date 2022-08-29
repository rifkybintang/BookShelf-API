const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'test menggunakan GET';
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: () => {
      return 'Test menggunakan POST';
    },
  },
];

module.exports = routes;
