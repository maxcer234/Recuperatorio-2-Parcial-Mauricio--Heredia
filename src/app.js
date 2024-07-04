import express from "express";

const app = express();

//middlewares
app.use(express.json());

//configuraciones
app.set("port", process.env.PORT || 4321);

//base de datos con array

const students = []

let id = 1;

//CRUD DE ESTUDIANTES

//Lista de todos los estudiantes
app.get("/students", (req, res) => {
    res.send(students);
});

//Devuelve un estudiante
app.get("/students/:id", (req, res) => {
    const { id } = req.params;
    const student = students.find(student => student.id === parseInt(id));
    if (!student) {
        return res.status(404).json("Estudiante no encontrado");
    }
    res.send(student);
});

//Crea un estudiante
app.post("/students", (req, res) => {
    const {fullname, age, curse} = req.body;

    if (!fullname || !age || !curse) {
        return res.status(400).json("Faltan datos");
    }

    const exitestudent = students.find(student => student.fullname === fullname);
    if (exitestudent) {
        return res.status(400).json("El estudiante ya existe");
    }

    const student = {
        id: id++,
        fullname,
        age,
        curse
    };
    students.push(student);
    res.status(201).send(student);
});


app.listen(app.get("port"), () => {
    console.log(`SERVIDOR EN EL PUERTO ${app.get("port")}`);
})