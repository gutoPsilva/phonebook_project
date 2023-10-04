import { SlOptions } from "react-icons/sl";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import IContact from "../interface/IContact";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Contact = (props: IContact) => {
  const { loadData } = useContext(AppContext);

  const favoriteContact = async (val: boolean) => {
    try{
      await axios.put("http://localhost:3000/contacts/update/"+props.id, {
        "favorito": val
      }).then(res => {
        console.log(res.data);
        loadData();
      })
    } catch(err){
      console.log(err);
    }
  };

  // const updateContact = async () => {
  //   try {
  //     await axios.put("http://localhost:3000/contacts/update/"+props.id, {
  //       "nome": props.nome,
  //       "tel_prin": props.tel_prin,
  //       "tel_sec": props.tel_sec,
  //       "url_foto": props.url_foto,
  //       "descricao": props.descricao,
  //       "favorito": true
  //     }).then(res => {
  //       console.log(res.data);
  //       loadData();
  //     })
  //   } catch (err){
  //     console.log(err);
  //   }
  // }

  return (
    <section className="w-full relative flex items-center">
      <div className="rounded-full w-20 overflow-hidden border-2 border-white flex items-center cursor-pointer" title={props.descricao}>
        <img className="z-10" src={props.url_foto} alt="Contact picture" />
        <hr className="absolute bg-white h-[2px] w-full rounded border-none"></hr>
      </div>
      <article className="w-full grid grid-rows-2 pl-2 gap-2">
        {/* container dos textos e das opções do contato */}
        <div className="flex justify-between items-start gap-2">
          <span className="break-all">{props.nome}</span> {/* nome do contato */}
          <button className="ml-auto" onClick={() => {
            favoriteContact(!props.favorito);
          }}>{props.favorito ? <AiFillStar /> : <AiOutlineStar />}</button>
          <button id={String(props.id)}>
            <SlOptions />
          </button>
          {/* botão de opções para o Update e Delete */}
        </div>
        <p>
          {props.tel_prin}, {props.tel_sec}
        </p>
        {/* Telefones */}
      </article>
    </section>
  );
};
