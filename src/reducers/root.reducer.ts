import { combineReducers } from "@reduxjs/toolkit";
import { ContactStateReducer, contactReducer } from "./contact/contact.reducer";
import {
  ContactDetailStateReducer,
  contactDetailReducer,
} from "./contact-detail/contact-detail.reducer";

export interface RootState {
  contact: ContactStateReducer;
  contactDetail: ContactDetailStateReducer;
}

const rootReducer = combineReducers({
  contact: contactReducer,
  contactDetail: contactDetailReducer,
});

export default rootReducer;
