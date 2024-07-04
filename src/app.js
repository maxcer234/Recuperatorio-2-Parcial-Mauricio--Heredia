import express from "express";

const app = express();

//middlewares
app.use(express.json());

//configuraciones
app.set("port", process.env.PORT || 4321);

//base de datos con array

const students = []

let id = 1;


//Validaciones de datos



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
    res.status(201).json(student);
});

//Actualiza un estudiante
app.put("/students/:id", (req, res) => {
    const id = +req.params.id
    const { fullname, age, curse } = req.body;
    const student = students.findIndex(student => student.id === id);
    if (!student) {
        return res.status(404).json("Estudiante no encontrado");
    }
    if (!fullname || !age || !curse) {
        return res.status(400).json("Faltan datos");
    }

    students[student] = {
        id: id,
        fullname,
        age,
        curse
    };

    res.status(200).json(students[student]);
});

//Elimina un estudiante
app.delete("/students/:id", (req, res) => {
    const id = +req.params.id;
    const student = students.findIndex(student => student.id === id);
    if (!student) {
        return res.status(404).json("Estudiante no encontrado");
    }
    const eliminar = students.splice(student, 1);
    res.status(200).json(eliminar);
})


app.listen(app.get("port"), () => {
    console.log(`SERVIDOR EN EL PUERTO ${app.get("port")}`);
})