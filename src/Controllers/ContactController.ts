import { Request, Response, Router } from "express";
import ContactRepository from "../Repositories/ContactRepository";

const contactRouter = Router();

contactRouter.post("/create", async (req: Request, res: Response): Promise<Response> =>{
  const repository = new ContactRepository();
  const newContact = await repository.createContact(req); // adicionou algum contato

  if(!newContact) return res.status(400).json({ errorMsg: "Ausência de dados (nome/telefone principal) ou dados inválidos" }); // o client é obrigado a fornecer pelo menos o nome E o telefone principal para criar um novo registro na tabela

  return res.status(200).json(newContact);
});

contactRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  const repository = new ContactRepository();
  const allContacts = await repository.getContacts();
  return res.status(200).json(allContacts);
});

contactRouter.put("/update/:id", async (req: Request, res:Response): Promise<Response> => {
  const repository = new ContactRepository();
  const updatedContact = await repository.updateContact(req);

  if(!updatedContact) return res.status(400).json({ errorMsg: "Dados inválidos" });

  return res.status(200).json(updatedContact); // retorna o contato que foi atualizado
});

contactRouter.delete("/delete/:id", async (req: Request, res: Response): Promise<Response> => {
  const repository = new ContactRepository();
  const contactDeleted = await repository.deleteContact(req); // deleta algum contato
  return res.status(200).json(contactDeleted);
});

export default contactRouter;
