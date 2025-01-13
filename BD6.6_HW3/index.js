const express = require('express');
const cors = require('cors');
const { getAllBooks, getBookById } = require('./controllers');
const app = express();
app.use(express.json());
app.use(cors());

// Retrieve All Books

app.get('/books', async (req, res) => {
  let result = await getAllBooks();
  res.json({ result });
});

// Retrieve Book by ID

app.get('/books/details/1', async (req, res) => {
  let result = await getBookById(req.params.id);
  res.json({ result });
});

module.exports = { app };
