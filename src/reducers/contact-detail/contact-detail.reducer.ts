import { AnyAction } from "redux-saga";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ContactInterface from "@/interfaces/contact/contact.interface";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import { CreateContactInput } from "@/api/contact/create-contact/create-contact";

interface ModalInterface {
  type: ModalTypeEnum;
  id: number;
}

export interface ContactDetailState {
  data: ContactInterface;
  isLoading?: boolean;
  isLoadingAddEdit?: boolean;
  errors?: string;
  activeModalData?: ModalInterface;
}

export interface ContactDetailStateReducer {
  contactDetail: ContactDetailState;
}

export const contactDetailInitialState: ContactDetailStateReducer = {
  contactDetail: {
    data: {
      id: 0,
      firstName: "",
      lastName: "",
      job: "",
      description: "",
    },
    isLoading: true,
    isLoadingAddEdit: false,
    errors: "",
    activeModalData: {
      type: ModalTypeEnum.EMPTY,
      id: -1,
    },
  },
};

export const getContactDetailActionDispatcher = (id: number) => ({
  type: ContactActionEnum.FETCH_CONTACT_DETAIL_REQUEST,
  payload: { id },
});

export const deleteContactActionDispatcher = (id: number) => ({
  type: ContactActionEnum.DELETE_CONTACT_REQUEST,
  payload: { id },
});

export const createContactActionDispatcher = (payload: CreateContactInput) => ({
  type: ContactActionEnum.CREATE_CONTACT_REQUEST,
  payload,
});

export const contactDetailSlice = createSlice({
  name: "contactDetail",
  initialState: contactDetailInitialState,
  reducers: {
    resetContactDetail: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.contactDetail = contactDetailInitialState.contactDetail;
    },
    getContactDetailAction: (state) => {
      state.contactDetail.isLoading = true;
      state.contactDetail.errors = "";
    },
    getContactDetailSuccessAction: (
      state,
      { payload: contactDetail }: PayloadAction<ContactDetailState>
    ) => {
      state.contactDetail.isLoading = false;
      state.contactDetail.data = contactDetail.data;
      state.contactDetail.errors = "";
    },
    getContactDetailErrorAction: (
      state,
      { payload: error }: PayloadAction<string>
    ) => {
      state.contactDetail.isLoading = false;
      state.contactDetail.errors = error;
    },

    createContactAction: (state) => {
      state.contactDetail.isLoadingAddEdit = true;
      state.contactDetail.errors = "";
    },
    createContactSuccessAction: (state) => {
      state.contactDetail.isLoadingAddEdit = false;
      state.contactDetail.errors = "";
      state.contactDetail = { ...contactDetailInitialState.contactDetail };
    },
    createContactErrorAction: (state) => {
      state.contactDetail.isLoadingAddEdit = false;
    },

    deleteContactAction: (state) => {
      state.contactDetail.isLoading = true;
      state.contactDetail.errors = "";
    },
    deleteContactSuccessAction: (state) => {
      state.contactDetail.isLoading = false;
      state.contactDetail.errors = "";
      state.contactDetail = { ...contactDetailInitialState.contactDetail };
    },
    deleteContactErrorAction: (state) => {
      state.contactDetail.isLoading = false;
    },

    openModalContact: (
      state,
      { payload: modalData }: PayloadAction<ModalInterface>
    ) => {
      state.contactDetail.activeModalData = modalData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.contactDetail,
      };
    });
  },
});

export const { reducer: contactDetailReducer, actions: contactDetailActions } =
  contactDetailSlice;
