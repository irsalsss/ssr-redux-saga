import { AnyAction } from "redux-saga";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ContactInterface from "@/interfaces/contact/contact.interface";
import ContactDetailActionEnum from "@/enum/contact/contact-detail-action.enum";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";

interface ModalInterface {
  type: ModalTypeEnum;
  id: number;
}

export interface ContactDetailState {
  data: ContactInterface;
  isLoading?: boolean;
  errors?: string;
  activeModalData?: ModalInterface;
}

export interface ContactDetailStateReducer {
  contactDetail: ContactDetailState;
}

const contactDetailInitialState: ContactDetailStateReducer = {
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
      type: ModalTypeEnum.EMPTY,
      id: -1,
    },
  },
};

export const getContactDetailActionDispatcher = (id: number) => ({
  type: ContactDetailActionEnum.FETCH_CONTACT_DETAIL_REQUEST,
  payload: { id },
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
    openModalAddEdit: (
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
