import { Contact } from "./Contact";
import { useContext, useState } from "react";
import { AppContext } from "../App";

export const ContactsList = () => {
  const [allSelected, setAllSelected] = useState(true);
  const { allContacts } = useContext(AppContext);

  return (
    <main className="shadow-lg">
      <div className="bg-foda flex w-fit rounded-t-lg overflow-hidden">
        <div className={"pl-4 pr-3 pt-2 transition duration-500 " + (allSelected ? "bg-foda" : "bg-dk-stone")}>
          <button
            onClick={() => {
              setAllSelected(true);
            }}>
            Todos os Contatos
          </button>
        </div>
        <div className={"pl-3 pr-4 pt-2 transition duration-500 " + (allSelected ? "bg-dk-stone" : "bg-foda")}>
          <button
            onClick={() => {
              setAllSelected(false);
            }}>
            Favoritos
          </button>
        </div>
      </div>
      <div className="bg-foda rounded-b-lg rounded-tr-lg p-6 min-h-[120px]">
        {/* Container da Lista */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Depois de ter carregado os contatos ele gera as listas */}
          {allContacts.length === 0 ? (
            <p className="text-2xl">Não há contatos salvos</p>
          ) : allSelected ? (
            allContacts.map(contact => {
              // mapear TODOS os contatos
              return <Contact key={contact.id} id={contact.id} nome={contact.nome} tel_prin={contact.tel_prin} tel_sec={contact.tel_sec} descricao={contact.descricao} url_foto={contact.url_foto} favorito={contact.favorito} />;
            })
          ) : // pegar apenas os que são favoritos
          allContacts.filter(contact => contact.favorito).length === 0 ? (
            <p className="text-2xl">Não há contatos favoritos</p>
          ) : (
            allContacts // existe ao menos 1 contato favorito
              .filter(contact => contact.favorito) // pegar apenas os favoritos
              .map(contact => {
                // mapear todos os favoritos
                return <Contact key={contact.id} id={contact.id} nome={contact.nome} tel_prin={contact.tel_prin} tel_sec={contact.tel_sec} descricao={contact.descricao} url_foto={contact.url_foto} favorito={contact.favorito} />;
              })
          )}
        </div>
      </div>
    </main>
  );
};
