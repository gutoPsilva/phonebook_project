import { FaUserPlus } from "react-icons/fa"
import { CreateForms } from "./CreateForms";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-4xl font-spartan">Agenda Telefônica</h1>
      <button><FaUserPlus size={32}/></button>
      <CreateForms/>
    </header>
  );
};
