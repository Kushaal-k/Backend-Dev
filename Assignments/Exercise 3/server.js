const express = require("express")
const app = express()

app.use(express.json())

const books = [
  { id: 1, title: "Book A" },
  { id: 2, title: "Book B" },
  { id: 3, title: "Book C" },
  { id: 4, title: "Book D" },
  { id: 5, title: "Book E" },
  { id: 6, title: "Book F" },
  { id: 7, title: "Book G" },
  { id: 8, title: "Book H" },
  { id: 9, title: "Book I" },
  { id: 10, title: "Book J" },
  { id: 11, title: "Book K" }
]

app.get("/books", (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const paginatedBooks = books.slice(startIndex, endIndex)

  res.json({
    page,
    limit,
    total: books.length,
    data: paginatedBooks
  })
})

app.listen(3000)