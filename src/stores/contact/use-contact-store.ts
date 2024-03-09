import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";
import { create } from "zustand";

export const defaultContact = {
  id: 0,
  firstName: "",
  lastName: "",
  job: "",
  description: "",
};

interface ActiveModalContactInterface extends ContactInterface {
  type: ModalTypeEnum;
}

const getUrlSearch = () => {
  return typeof window !== "undefined" ? window.location.search.slice(1) : "";
};

interface UseContactStoreState {
  search: string;
  setSearch: (value: string) => void;

  activeTab: ContactTabEnum;
  setActiveTab: (tab: ContactTabEnum) => void;

  isAscending: boolean;
  setIsAscending: (val: boolean) => void;

  favoriteContacts: Record<number, ContactInterface>;
  setFavoriteContacts: (contact: Record<number, ContactInterface>) => void;

  activeModalContact: ActiveModalContactInterface;
  setActiveModalContact: (contact: ActiveModalContactInterface) => void;
  handleCloseActiveModalContact: () => void;
}

const useContactStore = create<UseContactStoreState>()((set) => ({
  search: new URLSearchParams(getUrlSearch()).get("search") || "",
  setSearch: (value) => set({ search: value }),

  activeTab: ContactTabEnum.ALL,
  setActiveTab: (tab: ContactTabEnum) => set({ activeTab: tab }),

  isAscending: true,
  setIsAscending: (val: boolean) => set({ isAscending: val }),

  favoriteContacts: {},
  setFavoriteContacts: (contact: Record<number, ContactInterface>) =>
    set({ favoriteContacts: contact }),

  activeModalContact: { ...defaultContact, type: ModalTypeEnum.EMPTY },
  setActiveModalContact: (value) => set({ activeModalContact: value }),
  handleCloseActiveModalContact: () =>
    set({
      activeModalContact: { ...defaultContact, type: ModalTypeEnum.EMPTY },
    }),
}));

export default useContactStore;
