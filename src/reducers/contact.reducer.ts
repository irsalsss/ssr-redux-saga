import { ContactsInterface } from "@/interfaces/contact/contact.interface";
import { AnyAction } from "redux-saga";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ContactActionEnum from "@/enum/contact/contact-action.enum";

export interface ContactState {
  contact: {
    data: ContactsInterface;
    isLoading: boolean;
    errors: string;
  };
}

const contactInitialState: ContactState = {
  contact: {
    data: [],
    isLoading: false,
    errors: "",
  },
};

export const getActionDispatcher = (search: string) => ({
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
    getContactAction: (state: ContactState) => {
      state.contact.isLoading = true;
      state.contact.errors = "";
    },
    getContactSuccessAction: (
      state: ContactState,
      { payload: contact }: PayloadAction<ContactsInterface>
    ) => {
      state.contact.isLoading = false;
      state.contact.data = contact;
      state.contact.errors = "";
    },
    getContactErrorAction: (
      state: ContactState,
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
