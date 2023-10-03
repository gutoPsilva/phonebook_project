import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'contatos'})
export class Contact{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  nome: string;

  @Column("varchar", { length: 11 })
  tel_prin: string;

  @Column("varchar", { length: 11 })
  tel_sec: string;

  @Column("varchar", { length: 50 })
  descricao: string;

  @Column("varchar", { length: 60 })
  url_foto: string;

  @Column("bool")
  favoritado: boolean;
}