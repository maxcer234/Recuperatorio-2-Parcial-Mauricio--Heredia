import express from "express";

const app = express();

//middlewares
app.use(express.json());

//configuraciones
app.set("port", process.env.PORT || 4321);

//base de datos con array

const students = []

let id = 1;