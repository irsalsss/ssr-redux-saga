import { ContactsInterface } from "@/interfaces/contact/contact.interface";
import { AnyAction } from "redux-saga";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import FilterInterface from "@/interfaces/shared/filter.interface";
import SortByEnum from "@/enum/shared/sort-by.enum";

export interface ContactState {
  data: ContactsInterface;
  isLoading?: boolean;
  errors?: string;
  filter: FilterInterface;
}

export interface ContactStateReducer {
  contact: ContactState;
}

export const contactInitialState: ContactStateReducer = {
  contact: {
    data: [],
    isLoading: true,
    errors: "",
    filter: {
      search: "",
      sortBy: SortByEnum.ASC,
    },
  },
};

export const getContactActionDispatcher = (search: string) => ({
  type: ContactActionEnum.FETCH_CONTACT_REQUEST,
  payload: { search },
});

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactInitialState,
  reducers: {
    resetContact: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.contact = contactInitialState.contact;
    },
    setSearchContact: (
      state: ContactStateReducer,
      { payload: search }: PayloadAction<string>
    ) => {
      state.contact.filter.search = search;
    },
    setSortBy: (state: ContactStateReducer) => {
      state.contact.filter.sortBy =
        state.contact.filter.sortBy === SortByEnum.ASC
          ? SortByEnum.DESC
          : SortByEnum.ASC;
    },
    getContactAction: (state: ContactStateReducer) => {
      state.contact.isLoading = true;
      state.contact.errors = "";
    },
    getContactSuccessAction: (
      state: ContactStateReducer,
      { payload: contact }: PayloadAction<ContactState>
    ) => {
      state.contact.isLoading = false;
      state.contact.data = contact.data;
      state.contact.errors = "";
      state.contact.filter.search = contact.filter.search;
    },
    getContactErrorAction: (
      state: ContactStateReducer,
      { payload: error }: PayloadAction<string>
    ) => {
      state.contact.isLoading = false;
      state.contact.errors = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.contact,
      };
    });
  },
});

export const { reducer: contactReducer, actions: contactActions } =
  contactSlice;
