import fs from "fs";

export const readStudentsFromFile = async () => {
    const data = await fs.promises.readFile("students.json", "utf-8")
    return JSON.parse(data || "[]")
};

export const writeStudentsToFile = async (records) => {
    await fs.promises.writeFile("students.json", JSON.stringify(records, null, 2))
}