const { nanoid } = require('nanoid');
const books = require('./books');

// disinilah akar masalahnya yang bikin pusing astaga

// pertama menambahkan buku
const addBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name || name === '' || name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const isFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true;
    }
    return false;
  };
  const finished = isFinished(pageCount, readPage);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// kedua mendapatkan semua bukunya disini
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const lowName = name.toLowerCase();

    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((n) => n.name === lowName)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((r) => r.reading === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((r) => r.reading === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((f) => f.finished === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((f) => f.finished === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((m) => ({
        id: m.id,
        name: m.name,
        publisher: m.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

module.exports = {
  addBooks,
  getAllBooks,
};
