const {
  addBooks,
  getAllBooks,
  getByIdBooks,
  editBooks,
  deleteBooks,
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
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBooks,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooks,
  },

];

module.exports = routes;
