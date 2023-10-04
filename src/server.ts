import express from "express";
import db from "./data-source";
import cors from "cors";
import routes from "./Routes/routes";
import "reflect-metadata";

const app = express();

app.use(cors()); // sem o CORS, a requisição do client é bloqueada

app.use(express.json()); // responsável por converter o JSON para que o client receba como uma string ( basicamente faz um JSON.stringify() no objeto enviado como resposta ao client )

app.use(express.urlencoded({extended: false})); // é necessário o URLENCODED para receber os valores do método POST através do req.body

app.use(routes); // utiliza o routers como base para direcionar aos endpoints

db.initialize()
  .then(async () => {
    console.log("BD Conectado");
    app.listen(3000, () => console.log("Servidor rodando em na porta 3000")); // iniciar o projeto somente quando tiver acesso ao banco de dados
  })
  .catch(err => console.log("Erro na inicialização do BD " + err));