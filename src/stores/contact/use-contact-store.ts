import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";
import { create } from "zustand";

export const defaultContact = {
  id: 0,
  firstName: "",
  lastName: "",
  job: "",
  description: "",
};

interface UseContactStoreState {
  activeTab: ContactTabEnum;
  setActiveTab: (tab: ContactTabEnum) => void;

  favoriteContacts: Record<number, ContactInterface>;
  setFavoriteContacts: (contact: Record<number, ContactInterface>) => void;
}

const useContactStore = create<UseContactStoreState>()((set) => ({
  activeTab: ContactTabEnum.ALL,
  setActiveTab: (tab: ContactTabEnum) => set({ activeTab: tab }),

  favoriteContacts: {},
  setFavoriteContacts: (contact: Record<number, ContactInterface>) =>
    set({ favoriteContacts: contact }),
}));

export default useContactStore;
