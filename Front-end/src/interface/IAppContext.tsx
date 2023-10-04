import IContact from "./IContact";

interface IAppContext {
  allContacts: IContact[];
  setAllContacts: (prevState: IContact[]) => void;
  loadData: () => Promise<void>;
}

export default IAppContext;