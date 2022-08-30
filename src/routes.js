const {
  addBooks,
} = require('./handler');

// ini dia routes nya hmm kenapa error ya siapa lagi kalau bukan handler
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'ini halaman home';
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },

];

module.exports = routes;
