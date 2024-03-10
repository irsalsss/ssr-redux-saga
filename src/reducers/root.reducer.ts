import { combineReducers } from "@reduxjs/toolkit";
import { ContactStateReducer, contactReducer } from "./contact.reducer";

export interface RootState {
  contact: ContactStateReducer;
}

const rootReducer = combineReducers({
  contact: contactReducer,
});

export default rootReducer;
