import { all, fork } from "redux-saga/effects";
import {
  watchCreateContact,
  watchDeleteContact,
  watchEditContact,
  watchGetContact,
  watchGetDetailContact,
} from "./contact/contact.saga";

export default function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([
    fork(watchGetContact),
    fork(watchGetDetailContact),
    fork(watchCreateContact),
    fork(watchEditContact),
    fork(watchDeleteContact),
  ]);
}
