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
    await this.contactRepository.update(Number(req.params.id), req.body);
    return await this.contactRepository.findOne(req.body.id);
  }

  async createContact(req: Request): Promise<Contact[]> {
    const ah = contactRepository.create(req.body);
    if (!req.body.descricao) req.body.descricao = "Contato sem descrição";
    if (!req.body.url_foto) req.body.descricao = "https://i.imgur.com/3y4uhoQ.jpg";
    if (!req.body.favorito) req.body.favorito = false;

    await contactRepository.save(ah);
    return ah;
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