const express = require("express")
const app = express()

app.use(express.json())

const books = [
  { id: 1, title: "The Great Gatsby" },
  { id: 2, title: "To Kill a Mockingbird" },
  { id: 3, title: "Harry Potter" },
  { id: 4, title: "The Hobbit" },
  { id: 5, title: "Clean Code" }
]

app.get("/books/search", (req, res) => {
  const query = req.query.title

  if (!query) {
    return res.status(400).json({ message: "Title query is required" })
  }

  const results = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  )

  res.json(results)
})

app.listen(3000)