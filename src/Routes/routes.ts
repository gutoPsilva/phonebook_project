import { Router } from "express";
import contactRouter from "../Controllers/ContactController";

const routes = Router();

routes.use('/contacts', contactRouter); // todas as rotas que iniciarem com /contacts irão interagir com o CRUD da tabela contatos por conta do contactRouter


export default routes;