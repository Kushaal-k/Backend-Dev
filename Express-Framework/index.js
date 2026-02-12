const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json())

const PORT = 8000;

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the home page.")
})





app.get("/students", (req, res) => {
    const branch = req.query.branch;

    fs.readFile("students.json", "utf-8", (err, data) => {
        if(err) {
            return res.status(500).send("Error while accessing database!")
        }
        const students = JSON.parse(data || [])

        if(students.length === 0) {
            return res.status(404).send("Students not found");
        }

        if(!branch){
            return res.status(200).json(students);
        }

        return res.status(200).json(students.filter(s => s.branch === branch))
    })
    
})

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("students.json", "utf-8", (err, data) => {
        if(err) {
            return res.status(500).send("Error while accessing database!")
        }

        const students = JSON.parse(data);

        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        return res.status(200).json(student)
    })
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

        return res.status(200).json(students)
    })
})

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("students.json", "utf-8", (err, data) => {
        if(err){
            return res.status(500).send("Error while accessing database!")
        }

        const students = JSON.parse(data);

        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        const updatedStudents = students.filter((s) => s.id !== id)

        fs.writeFile("students.json", JSON.stringify(updatedStudents, null, 2), (err) => {
            if(err){
                return res.status(500).send("Error while saving data")
            }

            return res.status(200).json(updatedStudents);
        })
    })
})

app.patch("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // const {updatedName} = req.body;

    fs.readFile("students.json", "utf-8", (err, data) => {
        if(err){
            return res.status(500).send("Error while accessing database!")
        }

        const students = JSON.parse(data);

        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        const updatedStudents = students.map((s) => s.id === id ? {...s, ...req.body, id: s.id} : s);

        fs.writeFile("students.json", JSON.stringify(updatedStudents, null, 2), (err) => {
            if(err){
                return res.status(500).send("Error while saving data")
            }

            return res.status(200).json(updatedStudents);
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})