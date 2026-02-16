const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // important for form data
app.use(express.json());

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    res.send("Contact form submitted successfully!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
