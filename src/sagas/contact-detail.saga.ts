import {
  GetDetailContactsOutput,
  getDetailContacts,
} from "@/api/contact/get-contact-detail/get-detail-contact";
import ContactDetailActionEnum from "@/enum/contact/contact-detail-action.enum";
import { contactDetailActions } from "@/reducers/contact-detail.reducer";
import { AnyAction } from "redux-saga";
import { takeEvery, call, put } from "redux-saga/effects";

// Worker Saga: handles the actual asynchronous operation
function* fetchDetailContactSaga(action: AnyAction) {
  const id = action.payload.id as number;

  if (id === 0) {
    return;
  }

  yield put(contactDetailActions.getContactDetailAction());

  try {
    // Call the asynchronous function using 'call' effect
    const data: GetDetailContactsOutput = yield call(() =>
      getDetailContacts(id)
    );

    // Dispatch a success action with the received data
    yield put(
      contactDetailActions.getContactDetailSuccessAction({ data: data })
    );
  } catch (error) {
    // Dispatch a failure action if an error occurs
    yield put(
      contactDetailActions.getContactDetailErrorAction((error as Error).message)
    );
  }
}

export function* watchGetDetailContact() {
  yield takeEvery(
    ContactDetailActionEnum.FETCH_CONTACT_DETAIL_REQUEST,
    fetchDetailContactSaga
  );
}
