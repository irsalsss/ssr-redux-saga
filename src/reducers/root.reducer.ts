import { combineReducers } from "@reduxjs/toolkit";
import { ContactState, contactReducer } from "./contact.reducer";

export interface RootState {
  contact: ContactState;
}

const rootReducer = combineReducers({
  contact: contactReducer,
});

export default rootReducer;
