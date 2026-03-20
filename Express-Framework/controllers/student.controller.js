import {
	readStudentsFromFile,
	writeStudentsToFile,
} from "../config/fileHandler.js";

const getAllStudents = async (req, res) => {
	try {
		const students = await readStudentsFromFile();

		return res.status(200).json(students);
	} catch (error) {
		return res.status(500).send("Error while fetching students");
	}
};

const createStudents = async (req, res) => {
	const { name, branch } = req.body;
	if (!name || !branch) {
		return res.status(400).send("Both name and branch is required!");
	}

	try {
		const students = await readStudentsFromFile();

		const student = {
			id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
			name,
			branch,
		};
		students.push(student);

		await writeStudentsToFile(students);

		return res
			.status(200)
			.json({ message: "Registered Successfully", newStudent: student });
	} catch (error) {
		return res.status(500).send("Error while registering student");
	}
};

const updateStudentsDetail = async (req, res) => {
	const id = parseInt(req.params.id);

	fs.readFile("students.json", "utf-8", (err, data) => {
		if (err) {
			return res.status(500).send("Error while accessing database!");
		}

		const students = JSON.parse(data);

		const student = students.find((s) => s.id === id);

		if (!student) {
			return res.status(404).send("Student not found");
		}

		const updatedStudents = students.map((s) =>
			s.id === id ? { ...s, ...req.body, id: s.id } : s,
		);

		fs.writeFile(
			"students.json",
			JSON.stringify(updatedStudents, null, 2),
			(err) => {
				if (err) {
					return res.status(500).send("Error while saving data");
				}

				return res.status(200).json(updatedStudents);
			},
		);
	});
};

const deleteStudent = async (req, res) => {
	const id = parseInt(req.params.id);

	fs.readFile("students.json", "utf-8", (err, data) => {
		if (err) {
			return res.status(500).send("Error while accessing database!");
		}

		const students = JSON.parse(data);

		const student = students.find((s) => s.id === id);

		if (!student) {
			return res.status(404).send("Student not found");
		}

		const updatedStudents = students.filter((s) => s.id !== id);

		fs.writeFile(
			"students.json",
			JSON.stringify(updatedStudents, null, 2),
			(err) => {
				if (err) {
					return res.status(500).send("Error while saving data");
				}

				return res.status(200).json(updatedStudents);
			},
		);
	});
};

export { getAllStudents, createStudents, updateStudentsDetail, deleteStudent };
