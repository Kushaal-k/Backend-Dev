const express = require("express")
const app = express()

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded())

const allStudents = [
    {"name": "Kushaal", "branch": "CSE"},
    {"name": "Vishal", "branch": "IT"},
]


app.get("/", (req, res) => {
    res.render("form", { allStudents})
})

app.post("/students/register", (req, res) => {
    const {name, branch} = req.body;

    allStudents.push({name, branch})
    res.redirect("/")
})

app.listen(8000, () => {
    console.log(`Server is running at port ${8000}`);
})