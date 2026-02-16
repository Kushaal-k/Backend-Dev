const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.use((req, res) => {
    res.status(404).render("404", {
        url: req.originalUrl
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
