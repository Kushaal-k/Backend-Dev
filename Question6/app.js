const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

let posts = [
    { id: 1, title: "First Post", content: "Welcome to my blog!" }
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Post not found");
    res.render("post", { post });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;

    posts.push({
        id: posts.length + 1,
        title,
        content
    });

    res.redirect("/posts");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
