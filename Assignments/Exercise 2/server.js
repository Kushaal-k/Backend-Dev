const express = require("express")
const app = express()

app.use(express.json())

const validateYear = (req, res, next) => {
  const { year } = req.body

  if (year === undefined) {
    return res.status(400).json({ error: "Year is required" })
  }

  const yearNumber = Number(year)

  if (isNaN(yearNumber)) {
    return res.status(400).json({ error: "Year must be a valid number" })
  }

  const currentYear = new Date().getFullYear()

  if (yearNumber < 1900 || yearNumber > currentYear + 1) {
    return res.status(400).json({ error: `Year must be between 1900 and ${currentYear + 1}` })
  }

  next()
}

app.post("/movies", validateYear, (req, res) => {
  res.json({ message: "Movie added successfully", data: req.body })
})

app.listen(3000)