import { FormEvent, useState } from "react";
import IContact from "../interface/IContact";

export const CreateForms = () => {
  const [formData, setFormData] = useState<IContact>({
    nome:'',
    tel_prin:'',
    tel_sec: '',
    descricao: '',
    url_foto: '',
    favorito: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);
  }

  const handleInput = (input: string, val: string) => {
    setFormData({
      ...formData,
      [input]: val
    })
  }

  return (
    <div className="fixed max-w- top-5 z-30 bg-black">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={e => handleInput("nome", e.target.value)} required />
        </div>
        <div>
          <label htmlFor="tel_prin">Telefone Principal:</label>
          <input type="tel" id="tel_prin" name="tel_prin" value={formData.tel_prin} onChange={e => handleInput("tel_prin", e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="tel_sec">Telefone Secundário:</label>
          <input type="tel" id="tel_sec" name="tel_sec" value={formData.tel_sec} onChange={e => handleInput("tel_sec", e.target.value)} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={e => handleInput("descricao", e.target.value)} />
        </div>
        <div>
          <label htmlFor="url_foto">URL da Foto:</label>
          <input type="text" id="url_foto" name="url_foto" value={formData.url_foto} onChange={e => handleInput("url_foto", e.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};