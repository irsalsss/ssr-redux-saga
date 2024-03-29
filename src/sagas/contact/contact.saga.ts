import createContact, {
  CreateContactInput,
} from "@/api/contact/create-contact/create-contact";
import deleteContact from "@/api/contact/delete-contact/delete-contact";
import editContact from "@/api/contact/edit-contact/edit-contact";
import {
  GetDetailContactsOutput,
  getDetailContacts,
} from "@/api/contact/get-contact-detail/get-detail-contact";
import {
  GetContactsOutput,
  getContacts,
} from "@/api/contact/get-contacts/get-contacts";
import { notify } from "@/components/shared/toaster/toaster";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import ContactInterface, {
  FavoriteContacts,
} from "@/interfaces/contact/contact.interface";
import { contactDetailActions } from "@/reducers/contact-detail/contact-detail.reducer";
import {
  contactActions,
  getContactActionDispatcher,
} from "@/reducers/contact/contact.reducer";
import { RootState } from "@/reducers/root.reducer";
import { CustomError } from "@/utils/fetch-json/fetch-json";
import { filterByContactInfo } from "@/utils/filter-by-contact-info/filter-by-contact-info";
import { AnyAction } from "redux-saga";
import { call, put, select, takeLatest } from "redux-saga/effects";

const getSearch = (state: RootState) => state.contact.contact.filter.search;
const getFavoriteContacts = (state: RootState) =>
  state.contact.contact.favoriteContacts;

// Worker Saga: handles the actual asynchronous operation
export function* fetchContactSaga(action: AnyAction) {
  const search = action.payload.search;

  // trigger loading
  yield put(contactActions.getContactAction());

  try {
    // Call the asynchronous function using 'call' effect
    const data: GetContactsOutput = yield call(getContacts);

    // if search params is set, then do filter
    const filteredData = data.filter((contact) =>
      filterByContactInfo(contact, search)
    );

    // Dispatch a success action with the received data
    yield put(
      contactActions.getContactSuccessAction({
        data: filteredData,
        filter: { search },
      })
    );
  } catch (error) {
    // Dispatch a failure action if an error occurs
    yield put(contactActions.getContactErrorAction((error as Error).message));
  }
}

function* fetchDetailContactSaga(action: AnyAction) {
  const id = action.payload.id as number;

  // The ID 0 treated as a create functionality, so it will not fetch the detail API
  if (id === 0) {
    return;
  }

  // trigger loading
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

function* createContactSaga(action: AnyAction) {
  const payload = action.payload as CreateContactInput;

  // trigger loading
  yield put(contactDetailActions.createEditContactAction());

  try {
    // Call the asynchronous function using 'call' effect
    yield call(() => createContact(payload));

    // Dispatch a success action with the received data
    yield put(contactDetailActions.createEditContactSuccessAction());

    // show the toaster
    yield call(() => notify("Successfully created"));

    const search: string = yield select(getSearch);

    // refetch contact list
    yield put(getContactActionDispatcher(search));
  } catch (error) {
    const res = error as CustomError;
    // Dispatch a failure action if an error occurs
    yield put(contactDetailActions.createEditContactErrorAction());

    // show the toaster
    yield call(() => notify(res.message));
  }
}

function* editContactSaga(action: AnyAction) {
  const payload = action.payload as ContactInterface;
  const id = payload.id;

  // trigger loading
  yield put(contactDetailActions.createEditContactAction());

  try {
    // Call the asynchronous function using 'call' effect
    yield call(() => editContact(payload));

    // Dispatch a success action with the received data
    yield put(contactDetailActions.createEditContactSuccessAction());

    // show the toaster
    yield call(() => notify("Successfully edited"));

    // get current favorite contacts
    const favoriteContacts: FavoriteContacts = {
      ...(yield select(getFavoriteContacts)),
    };

    const isFavorite = Object.prototype.hasOwnProperty.call(
      favoriteContacts,
      id
    );

    // if the contact is favorited, then update list
    if (isFavorite) {
      favoriteContacts[id] = { ...payload, id: id };
    }

    // set to localstorage with the updated list
    try {
      localStorage.setItem("favorites", JSON.stringify(favoriteContacts));
    } catch (error) {
      // Handle localStorage error
      console.error("Error setting favorite contacts to localStorage:", error);
    }

    const search: string = yield select(getSearch);

    // refetch contact list
    yield put(getContactActionDispatcher(search));
  } catch (error) {
    const res = error as CustomError;
    // Dispatch a failure action if an error occurs
    yield put(contactDetailActions.createEditContactErrorAction());

    // show the toaster
    yield call(() => notify(res.message));
  }
}

function* deleteContactSaga(action: AnyAction) {
  const id = action.payload.id as number;

  yield put(contactDetailActions.deleteContactAction());

  try {
    // Call the asynchronous function using 'call' effect
    const contactDetail: ContactInterface = yield call(() => deleteContact(id));

    // show the toaster
    yield call(() =>
      notify(
        `${contactDetail.firstName} ${contactDetail.lastName} has been deleted`
      )
    );

    // Dispatch a success action with the received data
    yield put(contactDetailActions.deleteContactSuccessAction());

    const search: string = yield select(getSearch);

    // refetch contact list
    yield put(getContactActionDispatcher(search));
  } catch (error) {
    const res = error as CustomError;
    // Dispatch a failure action if an error occurs
    yield put(contactDetailActions.deleteContactErrorAction());

    // show the toaster
    yield call(() => notify(res.message));
  }
}

export function* watchGetContact() {
  yield takeLatest(ContactActionEnum.FETCH_CONTACT_REQUEST, fetchContactSaga);
}

export function* watchGetDetailContact() {
  yield takeLatest(
    ContactActionEnum.FETCH_CONTACT_DETAIL_REQUEST,
    fetchDetailContactSaga
  );
}

export function* watchCreateContact() {
  yield takeLatest(ContactActionEnum.CREATE_CONTACT_REQUEST, createContactSaga);
}

export function* watchEditContact() {
  yield takeLatest(ContactActionEnum.EDIT_CONTACT_REQUEST, editContactSaga);
}

export function* watchDeleteContact() {
  yield takeLatest(ContactActionEnum.DELETE_CONTACT_REQUEST, deleteContactSaga);
}
