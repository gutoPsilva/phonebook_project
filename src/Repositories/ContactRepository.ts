import Contact from "../Entities/Contact";
import db from "../data-source";
import { Request } from "express";
import { Repository } from "typeorm";
import IContact from "../interfaces/IContact";

class ContactRepository {
  contactRepository: Repository<IContact>;

  constructor() {
    this.contactRepository = db.getRepository(Contact);
  }

  async createContact(req: Request): Promise<IContact | null> {
    if (!req.body.nome || !req.body.tel_prin) return null; // ambos DEVEM ser fornecidos para que o registro seja feito

    // valores padrão para cada propriedade caso não sejam fornecidos
    if (!req.body.tel_sec) req.body.tel_sec = ""; // assuma o valor de uma string vazia (não existe tel secundário nesse caso)
    if (!req.body.descricao) req.body.descricao = "Contato sem descrição";
    if (!req.body.url_foto) req.body.url_foto = "https://i.imgur.com/3y4uhoQ.jpg";
    if (!req.body.favorito) req.body.favorito = false;

    // caso sejam fornecidos, verificar a validade desses dados para não estourar o limite do campo ou o tipo registrado no BD
    // se ao menos 1 não for válidos, a operação NÃO DEVE SER REALIZADA
    if ((req.body.nome.length > 50 || req.body.tel_prin.length > 11 || req.body.tel_sec.length > 11 || req.body.descricao.length > 50 || req.body.url_foto.length > 60 || typeof req.body.favorito !== "boolean")) return null;

    //  depois de validar todos os dados, posso destruturar pra inserir facilmente nos values
    const { nome, tel_prin, tel_sec, descricao, url_foto, favorito } = req.body;

    await db
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          nome: nome,
          tel_prin: tel_prin,
          tel_sec: tel_sec,
          descricao: descricao,
          url_foto: url_foto,
          favorito: favorito,
        },
      ])
      .execute();

    const newContact = await this.contactRepository.find();
    return newContact[newContact.length - 1]; // o último registro é sempre o último adicionado
  }

  async getContacts(): Promise<IContact[]> {
    return this.contactRepository.find();
  }

  async updateContact(req: Request): Promise<IContact | null> {
    const contactToUpdate = await this.contactRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!contactToUpdate) return null; // não existe contato com o ID fornecido para atualização.

    // caso não sejam fornecidos NOVOS valores nesses campos, devem manter-se os mesmos para a validação correta
    if (!req.body.nome) req.body.nome = contactToUpdate.nome;
    if (!req.body.tel_prin) req.body.tel_prin = contactToUpdate.tel_prin;
    if (!req.body.tel_sec) req.body.tel_sec = contactToUpdate.tel_sec || ""; // caso o tel_sec seja nulo, assuma o valor de uma string vazia
    if (!req.body.descricao) req.body.descricao = contactToUpdate.descricao;
    if (!req.body.url_foto) req.body.url_foto = contactToUpdate.url_foto;
    if (typeof req.body.favorito !== "boolean") req.body.favorito = contactToUpdate.favorito; // caso o fav fornecido não seja booleano, mantenha o seu antigo valor que é garantido que o valor booleano.
    // !favorito poderia resultar na negação de FALSE por exemplo, o que resultaria em um favorito = TRUE mesmo sendo fornecido FALSE

    // verificar se os NOVOS dados fornecidos não estouram o limite do campo
    if (req.body.nome.length > 50 || req.body.tel_prin.length > 11 || req.body.tel_sec.length > 11 || req.body.descricao.length > 50 || req.body.url_foto.length > 60) return null; // nesse caso não há necessidade de verificar a validade do favorito pois na parte acima seu valor já é validado

    // depois de validar todos os dados, posso desestruturar o objeto pra colocar facilmente no set
    const { nome, tel_prin, tel_sec, descricao, url_foto, favorito } = req.body;

    await db
      .createQueryBuilder()
      .update(Contact)
      .set({
        nome: nome,
        tel_prin: tel_prin,
        tel_sec: tel_sec,
        descricao: descricao,
        url_foto: url_foto,
        favorito: favorito,
      })
      .where("id = :id", { id: req.params.id })
      .execute();

    const updatedContact = await this.contactRepository.createQueryBuilder("contact").where("contact.id = :id", { id: req.params.id }).getOne();

    return updatedContact; // retorna o contato após o update
  }

  async deleteContact(req: Request): Promise<boolean> {
    const contactToDelete = await this.contactRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!contactToDelete) return false; // não existe o contato na tabela, logo retorna false.

    await db.createQueryBuilder().delete().from(Contact).where("id = :id", { id: req.params.id }).execute();

    return true; // o contato foi removido da tabela
  }
}

export default ContactRepository;
