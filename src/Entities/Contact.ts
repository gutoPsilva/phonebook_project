import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IContact from "../interfaces/IContact";

@Entity({ name: "contatos" }) // nome da tabela no BD
class Contact implements IContact{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50, nullable: false })
  nome: string;

  @Column("varchar", { length: 11, nullable: false })
  tel_prin: string;

  @Column("varchar", { length: 11 })
  tel_sec: string;

  @Column("varchar", { length: 50, default: "Contato sem descrição" })
  descricao: string;

  @Column("varchar", { length: 60, default: "https://i.imgur.com/3y4uhoQ.jpg" })
  url_foto: string;

  @Column("bool", { default: false })
  favorito: boolean;
}

export default Contact;
