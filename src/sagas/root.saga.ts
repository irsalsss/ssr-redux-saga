import { all, fork } from "redux-saga/effects";
import { watchGetContact } from "./contact.saga";

export default function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([fork(watchGetContact)]);
}
