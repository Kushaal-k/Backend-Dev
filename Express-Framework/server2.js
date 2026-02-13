const express = require("express");
const app = express()
const PORT = 8000
const fs = require("fs")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded( {extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/form.html")
})

app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;
    if(!name || !branch) {
        return res.status(400).send("Both name and branch is required!")
    }

    fs.readFile("students.json", "utf-8", (err, data) => {
        if(err) {
            return res.status(500).send("Error while accessing database!")
        }

        const students = JSON.parse(data);

        students.push({
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            branch
        })

        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if(err){
                return res.status(500).send("Error while saving data")
            }
        })

        return res.status(200).send("Registered Successfully")
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})