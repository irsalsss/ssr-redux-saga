import { all, fork } from "redux-saga/effects";
import { watchGetContact } from "./contact.saga";
import { watchGetDetailContact } from "./contact-detail.saga";

export default function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([fork(watchGetContact), fork(watchGetDetailContact)]);
}
