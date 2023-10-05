import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import IContact from "../interface/IContact";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Contact = (props: IContact) => {
  const { loadData, updateContact, setModal, setEdit, setIdToUpdate } = useContext(AppContext);

  const deleteContact = async () => {
    const confirm = window.confirm("Certeza que deseja apagar este contato?");
    if (confirm) {
      try {
        await axios.delete("http://localhost:3000/contacts/delete/" + props.id).then(res => {
          console.log(res.data);
          loadData();
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="w-full relative flex items-center">
      <div className="rounded-full aspect-square w-20 overflow-hidden border-2 border-white flex items-center cursor-pointer bg-white" title={props.descricao}>
        <img className="z-10" src={props.url_foto} alt="Contact picture" />
        <hr className="absolute bg-white h-[2px] w-full rounded border-none"></hr>
      </div>
      <article className="w-full grid grid-rows-2 pl-2 gap-2">
        {/* container dos textos e das opções do contato */}
        <div className="flex justify-between items-start gap-2">
          <span className="break-all sm:text-2xl font-medium">{props.nome}</span> {/* nome do contato */}
          <div className="flex flex-wrap gap-1 sm:gap-3 items-center justify-center">
            <button
              onClick={() => {
                updateContact(!props.favorito, props, props.id);
              }}>
              {props.favorito ? <AiFillStar size={20} /> : <AiOutlineStar size={20} />}
            </button>
            <button
              id={String(props.id)}
              onClick={() => {
                setModal(true);
                setEdit(true);
                if (props.id) setIdToUpdate(props.id);
              }}>
              <FaUserEdit size={20} />
            </button>
            <button className="self-center" id={String(props.id)} onClick={() => deleteContact()}>
              <FaUserMinus size={20} />
            </button>
          </div>
        </div>
        <span className="break-all sm:text-xl">
          {props.tel_prin}
          {props.tel_sec ? `, ${props.tel_sec}` : ""}
        </span>
      </article>
    </section>
  );
};
