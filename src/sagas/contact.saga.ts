import {
  GetContactsOutput,
  getContacts,
} from "@/api/contact/get-contacts/get-contacts";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import { contactActions } from "@/reducers/contact.reducer";
import { takeEvery, call, put } from "redux-saga/effects";

// Worker Saga: handles the actual asynchronous operation
function* fetchContactSaga() {
  try {
    // Call the asynchronous function using 'call' effect
    const data: GetContactsOutput = yield call(getContacts);

    // Dispatch a success action with the received data
    yield put(contactActions.getContactSuccessAction(data));
  } catch (error) {
    // Dispatch a failure action if an error occurs
    yield put(contactActions.getContactErrorAction((error as Error).message));
  }
}

export function* watchGetContact() {
  yield takeEvery(ContactActionEnum.FETCH_CONTACT_REQUEST, fetchContactSaga);
}
