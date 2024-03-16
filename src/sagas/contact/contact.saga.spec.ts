import { put, takeLatest } from "redux-saga/effects";
import { fetchContactSaga, watchGetContact } from "./contact.saga";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import { AnyAction } from "redux-saga";
import { MOCK_CONTACT_LIST } from "@/mocks/contact/contact-mock";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { contactActions } from "@/reducers/contact/contact.reducer";

describe("Contact Saga", () => {
  it("should dispatch action fetch contact", () => {
    const generator = watchGetContact();

    expect(generator.next().value).toEqual(
      takeLatest(ContactActionEnum.FETCH_CONTACT_REQUEST, fetchContactSaga)
    );
  });

  it("should return correct fetch contact output", () => {
    const generator = fetchContactSaga({
      payload: { search: "" },
    } as unknown as AnyAction);

    generator.next();
    generator.next();

    expect(
      generator.next(mapToCamelCase(MOCK_CONTACT_LIST)).value
    ).toStrictEqual(
      put(
        contactActions.getContactSuccessAction({
          data: mapToCamelCase(MOCK_CONTACT_LIST),
          filter: { search: "" },
        })
      )
    );
  });
});
