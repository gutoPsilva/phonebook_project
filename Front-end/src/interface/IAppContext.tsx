import IContact from "./IContact";

interface IAppContext {
  allContacts: IContact[];
  setAllContacts: (prevState: IContact[]) => void;
  loadData: () => Promise<void>;
  updateContact: (val: boolean, props:IContact, id:number|undefined) => Promise<void>;
  setModal: (prevState: boolean) => void;
  setIdToUpdate: (prevState: number) => void;
  edit: boolean;
  setEdit: (prevState: boolean) => void;
}

export default IAppContext;
