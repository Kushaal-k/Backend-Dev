import express from "express";

const router = express.Router();
import { getAllStudents, createStudents, updateStudentsDetail, deleteStudent } from "../controllers/student.controller.js";

router.get("/", getAllStudents)
router.post("/register", createStudents)
router.patch("/:id", updateStudentsDetail)
router.delete("/:id", deleteStudent)

export default router;