const request = require('supertest');
const { app } = require('../index.js');
const { getAllBooks, getBookById } = require('../controllers');
const http = require('http');
const express = require('express');
const { describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));
let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3010);
});

afterAll(async () => {
  server.close();
});
describe('Controller function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return all the exmployees', async () => {
    const mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockReturnValue(mockBooks);
    const result = getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
  it('should return the book by id', async () => {
    const mockBook = {
      bookId: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
    };
    getBookById.mockReturnValue(mockBook);
    const result = getBookById(1);
    expect(result).toEqual(mockBook);
  });
});

describe('API Endpoints', () => {
  it('should return all the books', async () => {
    const res = await request(server).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      result: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
    expect(res.body.result.length).toBe(3);
  });
  it('should return book by its Id', async () => {
    const res = await request(server).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      result: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
