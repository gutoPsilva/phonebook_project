import { createContext, useState, useEffect } from "react";
import { ContactsList } from "./components/ContactsList";
import { Header } from "./components/Header";
import IAppContext from "./interface/IAppContext";
import IContact from "./interface/IContact";
import axios from "axios";
import { Forms } from "./components/Forms";

export const AppContext = createContext<IAppContext>({
  allContacts: [],
  setAllContacts: () => {},
  loadData: async () => {},
  setModal: () => {},
  edit: false,
  setEdit: () => {},
  setIdToUpdate: () => {},
  updateContact: async () => {},
});

function App() {
  const [allContacts, setAllContacts] = useState<IContact[]>([]); // para renderizar todos os contatos
  const [modal, setModal] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(0);
  const [edit, setEdit] = useState(false);

  const loadData = async () => {
    try {
      await axios
        .get("http://localhost:3000/contacts")
        .then(res => setAllContacts(res.data))
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const updateContact = async (val: boolean, props:IContact, id: number|undefined) => {
    try {
      await axios
        .put("http://localhost:3000/contacts/update/" + String(id), {
          nome: props.nome,
          tel_prin: props.tel_prin,
          tel_sec: props.tel_sec,
          url_foto: props.url_foto,
          descricao: props.descricao,
          favorito: val,
        })
        .then(res => {
          console.log(res.data);
          loadData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // carregar a lista na primeira vez
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-cz-escuro text-white px-4 py-6 font-spartan flex flex-col items-center overflow-x-hidden font-medium">
      <div className="max-w-2xl w-full grid gap-4">
        {/* container geral */}
        <AppContext.Provider value={{ allContacts, setAllContacts, loadData, setModal, setEdit, edit, setIdToUpdate, updateContact }}>
          <Header />
          {modal ? <Forms id={idToUpdate} /> : <ContactsList />}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
