const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json())

const PORT = 8000;

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the home page.")
})


const readStudentsFromFile = async () => {
    const data = await fs.promises.readFile("students.json", "utf-8")
    return JSON.parse(data || "[]")
};

const writeStudentsToFile = async (records) => {
    await fs.promises.writeFile("students.json", JSON.stringify(records, null, 2))
}


app.get("/students", async (req, res) => {
    const branch = req.query.branch;

    try {
        const students = await readStudentsFromFile();

        if(students.length === 0) {
            return res.status(404).send("Students not found");
        }

        if(!branch){
            return res.status(200).json(students);
        }

        return res.status(200).json(students.filter(s => s.branch === branch))
    } 
    catch (error) {
        return res.status(500).send("Error while acessing database")
    }
})


app.get("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const students = await readStudentsFromFile();

        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        return res.status(200).json(student)
    } 
    catch (error) {
        return res.status(500).send("Error while accessing database")
    }
    
})

app.post("/students/register", async (req, res) => {
    const { name, branch } = req.body;
    if(!name || !branch) {
        return res.status(400).send("Both name and branch is required!")
    }

    try {
        const students = await readStudentsFromFile()
    
        const student = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            branch
        }
        students.push(student)

        await writeStudentsToFile(students)

        return res.status(200).json({message: "Registered Successfully", newStudent : student})
    } 
    catch (error) 
    {
        return res.status(500).send("Error while registering student")
    }
})

app.patch("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const students = await readStudentsFromFile()

        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        const updatedStudents = students.map((s) => s.id === id ? {...s, ...req.body, id: s.id} : s);

        await writeStudentsToFile(updatedStudents)

        return res.status(200).json(updatedStudents);
    } 
    catch (error) {
        return res.status(500).send("Error while updating student details")
    }    
})

app.delete("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const students = await readStudentsFromFile()


        const student = students.find(s => s.id === id);

        if(!student) {
            return res.status(404).send("Student not found");
        }

        const updatedStudents = students.filter((s) => s.id !== id)

        await writeStudentsToFile(updatedStudents)
        return res.status(200).json(updatedStudents);
    } 
    catch (error) {
        return res.status(500).send("Error while deleting user from database")
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})