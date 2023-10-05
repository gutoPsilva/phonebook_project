import { FaUserPlus } from "react-icons/fa"
import { AppContext } from "../App";
import { useContext} from "react"

export const Header = () => {
  const { setModal, setEdit } = useContext(AppContext);

  return (
    <header className="flex justify-between items-center relative">
      <h1 className="text-4xl font-spartan">Agenda Telefônica</h1>
      <button onClick={() => {
        setModal(true);
        setEdit(false);
      }}>
        <FaUserPlus size={32} title={"Criar um novo contato"}/>
      </button>
    </header>
  );
};
