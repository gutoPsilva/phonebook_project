import { Request, Response, Router } from "express";
import ContactRepository from "../Repositories/ContactRepository";

const contactRouter = Router();

contactRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  const repository = new ContactRepository();
  const allContacts = await repository.getContacts();
  return res.status(200).json(allContacts);
});

contactRouter.post("/create", async (req: Request, res: Response): Promise<Response> =>{
  const repository = new ContactRepository();
  const newContacts = await repository.createContact(req); // adicionou algum contato
  return res.status(201).json(newContacts);
});

contactRouter.put("/update/:id", async (req: Request, res:Response): Promise<Response> => {
  const repository = new ContactRepository();
  const updatedContact = await repository.updateContact(req); // atualizou algum contato
  return res.status(201).json(updatedContact);
});

contactRouter.delete("/delete/:id", async (req: Request, res: Response): Promise<Response> => {
  const repository = new ContactRepository();
  const allContacts = await repository.deleteContact(req); // deleta algum contato
  return res.status(200).json(allContacts);
});

export default contactRouter;
