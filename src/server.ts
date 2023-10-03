import express from "express";
import db from "./data-source";
import cors from "cors";
import routes from "./Routes/routes";
import "reflect-metadata";

const app = express();

app.use(cors()); // sem o CORS, a requisição do front-end é bloqueada

app.use(express.json()); // responsável por converter o JSON para que o client receba como uma string
app.use(express.urlencoded({extended: false})); // é necessário o URLENCODED para receber os valores do método POST através do req.body

app.use(routes); // utiliza o routers como base para direcionar aos endpoints

db.initialize()
  .then(async () => {
    console.log("BD Conectado");
    app.listen(3000, () => console.log("Servidor rodando em localhost:3000")); // iniciar o projeto somente quando tiver acesso ao banco de dados
  })
  .catch(err => console.log("Erro na conexão do BD " + err));