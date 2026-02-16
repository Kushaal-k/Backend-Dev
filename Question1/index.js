const express = require("express")

const app = express();

app.get("/users", (req, res) => {
    try {
        const { name } = req.params;

        const users = [
            { id: 1, name: "Rahul" },
            { id: 2, name: "Rohit" },
            { id: 3, name: "Ravi" }
        ];

        let filteredUsers = users;

        if(name) {
            filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(name.toLowerCase())
            )
        }

        res.status(200).json(filteredUsers);
    } 
    catch (error) {
        res.status(500).json({ message: "Server error"})
    }
})