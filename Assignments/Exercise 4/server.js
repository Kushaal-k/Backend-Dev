const express = require("express")
const app = express()

app.use(express.json())

let authors = []
let idCounter = 1

app.post("/authors", (req, res) => {
  const author = {
    id: idCounter++,
    name: req.body.name
  }

  authors.push(author)
  res.status(201).json(author)
})

app.get("/authors", (req, res) => {
  res.json(authors)
})

app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id))

  if (!author) {
    return res.status(404).json({ message: "Author not found" })
  }

  res.json(author)
})

app.put("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id))

  if (!author) {
    return res.status(404).json({ message: "Author not found" })
  }

  author.name = req.body.name
  res.json(author)
})

app.delete("/authors/:id", (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ message: "Author not found" })
  }

  const deleted = authors.splice(index, 1)
  res.json(deleted[0])
})

app.listen(3000)