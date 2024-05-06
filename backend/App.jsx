const express = require("express");

const app = express();

app.use(express.json());

const violenciaDomestica = require("./controllers/violenciaDomestica")

app.use("/violenciaDomestica", violenciaDomestica)

app.listen(8080, ()=>{
    console.log("Conectado")
})