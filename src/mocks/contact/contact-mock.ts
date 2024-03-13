import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import SortByEnum from "@/enum/shared/sort-by.enum";
import ContactInterface, {
  ContactsInterface,
} from "@/interfaces/contact/contact.interface";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

export const MOCK_CONTACT_LIST = [
  {
    id: 1,
    first_name: "Luke",
    last_name: "Skywalker",
    job: "Jedi knight",
    description: "Son of Anakin Skywalker",
  },
  {
    id: 2,
    first_name: "Obi-Wan",
    last_name: "Kenobi",
    job: "Jedi master",
    description: "Old Ben was trained by Qui-Gon Jinn",
  },
  {
    id: 3,
    first_name: "Han",
    last_name: "Solo",
    job: "Smuggler",
    description: "Partnered with a famous Wookie",
  },
  {
    id: 4,
    first_name: "Leia",
    last_name: "Organa",
    job: "Princess",
    description: "Luke's secret twin sister",
  },
  {
    id: 5,
    first_name: "Darth",
    last_name: "Vader",
    job: "Sith lord",
    description: "I am your father!",
  },
];

export const MOCK_CONTACT_FAVORITE = {
  1: {
    id: 1,
    firstName: "Luke",
    lastName: "Skywalker",
    job: "Jedi knight",
    description: "Son of Anakin Skywalker",
  },
};

export const MOCK_CONTACT_REDUCER = {
  contact: {
    data: mapToCamelCase<ContactsInterface>(MOCK_CONTACT_LIST),
    isLoading: false,
    errors: "",
    filter: {
      search: "",
      sortBy: SortByEnum.ASC,
    },
  },
};

export const MOCK_CONTACT_DETAIL_REDUCER = {
  contactDetail: {
    data: {
      id: 0,
      firstName: "",
      lastName: "",
      job: "",
      description: "",
    },
    isLoading: true,
    errors: "",
    activeModalData: {
      type: ModalTypeEnum.EMPTY,
      id: -1,
    },
  },
};

export const MOCK_DELETE_CONTACT = {
  contactDetail: {
    data: mapToCamelCase<ContactInterface>(MOCK_CONTACT_LIST[0]),
    isLoading: false,
    errors: "",
    activeModalData: {
      type: ModalTypeEnum.DELETE,
      id: 1,
    },
  },
};

export const MOCK_ADD_CONTACT = {
  contactDetail: {
    data: {
      id: 0,
      firstName: "",
      lastName: "",
      job: "",
      description: "",
    },
    isLoading: false,
    errors: "",
    activeModalData: {
      type: ModalTypeEnum.ADD,
      id: 0,
    },
  },
};
