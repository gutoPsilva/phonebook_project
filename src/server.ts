import express from "express";
import { Contact } from "./Entities/Contact";
import "reflect-metadata";
import db from "./db";

const app = express();

db.initialize()
  .then(() => {
    console.log("BD Conectado");
  })
  .catch(err => console.log("Erro na conexão do BD " + err));

const contactRepository = db.getRepository(Contact);

app.get("/create/:nome/:tel_prin", async (req, res) => {
  // CRUD --> Create
  const { nome, tel_prin } = req.params;
  await db
    .createQueryBuilder()
    .insert()
    .into(Contact)
    .values([{ nome: nome, tel_prin: tel_prin }])
    .execute();

  const newContacts = await contactRepository.find();

  res.json(newContacts);
});

app.get("/", async (req, res) => {
  // CRUD --> READ
  // const getContacts = async () => {
  //   const allContacts = await contactRepository.find(); // retorna tudo que está na tabela contatos
  //   console.log(allContacts);
  //   return allContacts;
  // };

  const savedContacts = await contactRepository.find(); // pega tudo que está na tabela de contatos
  res.json(savedContacts); // quando o fetch ser utilizado com a URL "http:\\localhost:3000" todos os contatos serão retornados num .JSON
});

app.get("/update/:id/:nome/:tel_prin", async (req, res) => {
  //
  const { id, nome, tel_prin } = req.params;

  await db.createQueryBuilder().update(Contact).set({ nome: nome, tel_prin: tel_prin }).where("id = :id", { id: id }).execute();

  const updatedContacts = await contactRepository.find();
  res.json(updatedContacts);
});

app.get("/delete/:id", async (req, res) => {
  // CRUD --> DELETE
  await db.createQueryBuilder().delete().from(Contact).where("id = :id", { id: req.params.id }).execute();

  const newContacts = await contactRepository.find(); // nova lista de contatos após exclusão!!!
  res.json(newContacts);
});

// app.get("/fav/:id/:favoritado", async (req, res) => { // favoritar algum contato
//   const { id, favoritado } = req.params;
//   await db
//     .createQueryBuilder()
//     .update(Contact)
//     .set({favoritado: Number(favoritado),})
//     .where("id = :id", { id: Number(id) })
//     .execute();

//   const favContacts = await db.createQueryBuilder().select("contact").from(Contact, "contact").where("user.favoritado = :favoritado", { favoritado: 1}).getMany() // retorna todos que possuem 1 (Favoritado = TRUE)

//   res.json(favContacts); // retornar a lista de contatos favoritados
// });

app.listen("3000", () => {
  console.log("Servidor rodando no localhost:3000");
});
