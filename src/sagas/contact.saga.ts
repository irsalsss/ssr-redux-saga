import {
  GetContactsOutput,
  getContacts,
} from "@/api/contact/get-contacts/get-contacts";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import { contactActions } from "@/reducers/contact.reducer";
import { filterByContactInfo } from "@/utils/filter-by-contact-info/filter-by-contact-info";
import { AnyAction } from "redux-saga";
import { takeEvery, call, put } from "redux-saga/effects";

// Worker Saga: handles the actual asynchronous operation
function* fetchContactSaga(action: AnyAction) {
  const search = action.payload.search;

  contactActions.getContactAction();

  try {
    // Call the asynchronous function using 'call' effect
    const data: GetContactsOutput = yield call(getContacts);

    const filteredData = data.filter((contact) =>
      filterByContactInfo(contact, search)
    );

    // Dispatch a success action with the received data
    yield put(contactActions.getContactSuccessAction(filteredData));
  } catch (error) {
    // Dispatch a failure action if an error occurs
    yield put(contactActions.getContactErrorAction((error as Error).message));
  }
}

export function* watchGetContact() {
  yield takeEvery(ContactActionEnum.FETCH_CONTACT_REQUEST, fetchContactSaga);
}
