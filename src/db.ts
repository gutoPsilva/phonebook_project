import { DataSource } from "typeorm";
import { Contact } from "./Entities/Contact";

const db = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "agenda_tel",
  entities: [Contact],
  logging: true,
  synchronize: false,
});

export default db;
