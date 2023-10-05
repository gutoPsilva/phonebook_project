import { FormEvent, useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill, BsTelephonePlusFill, BsFillImageFill } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import IContact from "../interface/IContact";
import { AppContext } from "../App";
import axios from "axios";

type IDProp = {
  id: number | undefined;
};

export const Forms = (props: IDProp) => {
  const { setModal, loadData, edit, updateContact } = useContext(AppContext);

  const [formData, setFormData] = useState<IContact>({
    id: props.id,
    nome: "",
    tel_prin: "",
    tel_sec: "",
    descricao: "",
    url_foto: "",
    favorito: false,
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
    <div className="bg-cz-claro md:text-xl rounded-lg relative p-2 shadow-black shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-6 py-6">
        <div className="flex gap-4 items-center">
          <label htmlFor="nome">
            <FaUserAlt size={24} />
          </label>
          <input
            className="flex-grow text-white px-2 py-1 bg-transparent outline-none placeholder:text-gray-300 border-b-2 border-white"
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={e => handleInput("nome", e.target.value)}
            placeholder="Nome"
            {...(edit ? {} : { required: true })} // obrigatório somente no CREATE
            maxLength={50}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="tel_prin">
            <BsFillTelephoneFill size={24} />
          </label>
          <input
            className="flex-grow text-white px-2 py-1 bg-transparent outline-none placeholder:text-gray-300 border-b-2 border-white"
            type="tel"
            id="tel_prin"
            name="tel_prin"
            value={formData.tel_prin}
            onChange={e => handleInput("tel_prin", e.target.value)}
            placeholder="Telefone Prin. (ex: 11 98910-9727)"
            {...(edit ? {} : { required: true })} // obrigatório somente no CREATE
            maxLength={13}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="tel_sec">
            <BsTelephonePlusFill size={24} />
          </label>
          <input
            className="flex-grow text-white px-2 py-1 bg-transparent outline-none placeholder:text-gray-300 border-b-2 border-white/75"
            type="tel"
            id="tel_sec"
            name="tel_sec"
            value={formData.tel_sec}
            onChange={e => handleInput("tel_sec", e.target.value)}
            placeholder="Telefone Sec. (ex: 11 4801-7265)"
            maxLength={13}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="descricao">
            <BiMessageAltDetail size={28} />
          </label>
          <textarea
            className="resize-none text-white flex-grow px-2 py-1 bg-transparent outline-none placeholder:text-gray-300 border-b-2 border-white max-h-[38px]"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={e => handleInput("descricao", e.target.value)}
            placeholder="Descrição do Contato"
            maxLength={50}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="url_foto">
            <BsFillImageFill size={24} />
          </label>
          <input
            className="flex-grow text-white px-2 py-1 bg-transparent outline-none placeholder:text-gray-300 border-b-2 border-white"
            type="text"
            id="url_foto"
            name="url_foto"
            value={formData.url_foto}
            onChange={e => handleInput("url_foto", e.target.value)}
            placeholder="URL da foto"
            maxLength={60}
          />
        </div>
        <div className="flex gap-6">
          <button className="flex-grow bg-white text-cz-claro text-xl font-bold rounded p-2" type="submit">
            {edit ? "Editar Contato" : "Criar Contato"}
          </button>
          <button
            className="bg-white text-cz-claro text-xl font-bold rounded p-2 sm:px-10"
            onClick={() => {
              setModal(false);
            }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
