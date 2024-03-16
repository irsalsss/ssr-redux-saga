import createSagaMiddleware from "redux-saga";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const sagaMiddleware = createSagaMiddleware();

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });
};

export default rootReducer;
