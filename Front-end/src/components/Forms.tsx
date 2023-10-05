import { FormEvent, useState, useContext } from "react";
import { GrClose } from "react-icons/gr";
import IContact from "../interface/IContact";
import { AppContext } from "../App";
import axios from "axios";

type IDProp = {
  id : number|undefined,
}

export const Forms = (props:IDProp) => {
  const { setModal, loadData, edit, updateContact } = useContext(AppContext);

  const [formData, setFormData] = useState<IContact>({
    id: props.id,
    nome: "",
    tel_prin: "",
    tel_sec: "",
    descricao: "",
    url_foto: "",
    favorito: true,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setModal(false);

    if (edit) {
      // 1 == TRUE, é para EDITAR um registro
      updateContact(formData.favorito, formData, props.id);
      loadData();
    } else {
      try {
        await axios
          .post("http://localhost:3000/contacts/create/", {
            nome: formData.nome,
            tel_prin: formData.tel_prin,
            tel_sec: formData.tel_sec,
            url_foto: formData.url_foto,
            descricao: formData.descricao,
            favorito: false,
          })
          .then(res => {
            console.log(res.data);
            loadData();
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInput = (input: string, val: string) => {
    setFormData({
      ...formData,
      [input]: val,
    });
  };

  return (
    <div className="bg-foda md:text-xl rounded-lg relative p-2 shadow">
      <button className="absolute top-3 right-3" onClick={() => setModal(false)}>
        <GrClose className="filter-white" />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pb-6 pt-8">
        <div className="flex gap-2 items-center">
          <label htmlFor="nome">Nome{edit ? "" : "*"}:</label>
          <input
            className="flex-grow text-stone-900 px-2 py-1 placeholder:text-gray-500"
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={e => handleInput("nome", e.target.value)}
            placeholder="Gustavo Pereira da Silva"
            {...(edit ? {} : { required: true })} // obrigatório somente no CREATE
            maxLength={50}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="tel_prin">Telefone Principal{edit ? "" : "*"}:</label>
          <input
            className="flex-grow text-stone-900 px-2 py-1 placeholder:text-gray-500"
            type="tel"
            id="tel_prin"
            name="tel_prin"
            value={formData.tel_prin}
            onChange={e => handleInput("tel_prin", e.target.value)}
            placeholder="11 98910-9727"
            {...(edit ? {} : { required: true })} // obrigatório somente no CREATE
            maxLength={13}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="tel_sec">Telefone Secundário:</label>
          <input
            className="flex-grow text-stone-900 px-2 py-1 placeholder:text-gray-500"
            type="tel"
            id="tel_sec"
            name="tel_sec"
            value={formData.tel_sec}
            onChange={e => handleInput("tel_sec", e.target.value)}
            placeholder="11 4002-8922"
            maxLength={13}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            className="resize-none text-stone-900 flex-grow px-2 py-1 placeholder:text-gray-500"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={e => handleInput("descricao", e.target.value)}
            placeholder="Em Busca de um Trampo"
            maxLength={50}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="url_foto">URL da Foto:</label>
          <input
            className="flex-grow text-stone-900 px-2 py-1 placeholder:text-gray-500"
            type="text"
            id="url_foto"
            name="url_foto"
            value={formData.url_foto}
            onChange={e => handleInput("url_foto", e.target.value)}
            placeholder="https://i.imgur.com/3y4uhoQ.jpg"
            maxLength={60}
          />
        </div>
        <button className="w-full bg-white text-stone-900 text-xl font-bold rounded" type="submit">
          {edit ? "Editar Contato" : "Criar Contato"}
        </button>
      </form>
    </div>
  );
};
