import SortByEnum from "@/enum/shared/sort-by.enum";
import {
  contactActions,
  contactInitialState,
  contactReducer,
} from "./contact.reducer";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { MOCK_CONTACT_LIST } from "@/mocks/contact/contact-mock";
import ContactInterface from "@/interfaces/contact/contact.interface";

describe("contact reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = contactReducer(initialState, action);

    expect(result).toEqual(contactInitialState);
  });

  it("should handle resetContact", () => {
    const action = contactActions.resetContact();
    const state = contactReducer(contactInitialState, action);

    expect(state.contact).toEqual(contactInitialState.contact);
  });

  it("should handle setSearchContact", () => {
    const search = "test";
    const action = contactActions.setSearchContact(search);
    const state = contactReducer(contactInitialState, action);

    expect(state.contact.filter.search).toEqual(search);
  });

  it("should handle setSortBy", () => {
    const action = contactActions.setSortBy();
    const state = contactReducer(contactInitialState, action);

    expect(state.contact.filter.sortBy).toEqual(SortByEnum.DESC);
  });

  it("should handle getContactAction", () => {
    const action = contactActions.getContactAction();
    const state = contactReducer(contactInitialState, action);

    expect(state.contact.isLoading).toEqual(true);
    expect(state.contact.errors).toEqual("");
  });

  it("should handle getContactSuccessAction", () => {
    const list = mapToCamelCase<Array<ContactInterface>>(MOCK_CONTACT_LIST);
    const action = contactActions.getContactSuccessAction({
      data: list,
      filter: { search: "" },
    });
    const state = contactReducer(contactInitialState, action);

    expect(state.contact.isLoading).toEqual(false);
    expect(state.contact.data).toEqual(list);
    expect(state.contact.errors).toEqual("");
    expect(state.contact.filter.search).toEqual("");
  });

  it("should handle getContactErrorAction", () => {
    const error = "Error fetching contacts";
    const action = contactActions.getContactErrorAction(error);
    const state = contactReducer(contactInitialState, action);
    expect(state.contact.isLoading).toEqual(false);
    expect(state.contact.errors).toEqual(error);
  });
});
