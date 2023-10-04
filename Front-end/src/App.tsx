import { createContext, useState, useEffect } from "react";
import { ContactsList } from "./components/ContactsList";
import { Header } from "./components/Header";
import IAppContext from "./interface/IAppContext";
import IContact from "./interface/IContact";
import axios from "axios";

export const AppContext = createContext<IAppContext>({
  allContacts: [],
  setAllContacts: () => {},
  loadData: async() => {}
});

function App() {
  const [allContacts, setAllContacts] = useState<IContact[]>([]);

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

  useEffect(() => { // carregar a lista na primeira vez
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 text-white px-4 py-6 font-spartan flex flex-col items-center overflow-x-hidden">
      <div className="max-w-2xl w-full grid gap-4">
        {/* container geral */}
        <AppContext.Provider value={{ allContacts, setAllContacts, loadData }}>
          <Header />
          <ContactsList />
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
