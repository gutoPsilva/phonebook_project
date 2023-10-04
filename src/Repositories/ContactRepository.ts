import Contact from "../Entities/Contact";
import db from "../data-source";
import { Request } from "express";
import { Repository } from "typeorm";

const contactRepository = db.getRepository(Contact);

class ContactRepository{
  contactRepository: Repository<Contact>;

  constructor(){
    this.contactRepository = db.getRepository(Contact);
  }

  async getContacts(): Promise<Contact[]> {
    return contactRepository.find();
  }

  async updateContact(req: Request): Promise<Contact|null> {
    if (!req.body.descricao) req.body.descricao = "Contato sem descrição";
    if (!req.body.url_foto) req.body.descricao = "https://i.imgur.com/3y4uhoQ.jpg";
    if (!req.body.favorito) req.body.favorito = false;

    const contact = await contactRepository.findOne({
      where: {
        id: +req.params.id
      }
    });

    if(!contact) return null; // não existe contato com o ID fornecido para atualização.

    const updatedContact = this.contactRepository.merge(contact, req.body);
    await this.contactRepository.save(updatedContact);
    return updatedContact;
  }

  async createContact(req: Request): Promise<Contact[]> {
    const newContact = contactRepository.create(req.body);
    if (!req.body.descricao) req.body.descricao = "Contato sem descrição";
    if (!req.body.url_foto) req.body.descricao = "https://i.imgur.com/3y4uhoQ.jpg";
    if (!req.body.favorito) req.body.favorito = false;

    await contactRepository.save(newContact);
    return newContact;
  }

  async deleteContact(req: Request): Promise<boolean> {
    try {
      await contactRepository.delete(req.params.id);
      return true;
    } catch {
      return false;
    }
  }
};

export default ContactRepository;
