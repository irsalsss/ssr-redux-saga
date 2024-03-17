import ContactModalDelete from "./contact-modal-delete";
import { renderWithProviders } from "@/utils/test/wrapper-testing";
import {
  MOCK_CONTACT_REDUCER,
  MOCK_DELETE_CONTACT,
} from "@/mocks/contact/contact-mock";

describe("ContactModalDelete", () => {
  it("should render ContactModalDelete successfully", () => {
    const { baseElement } = renderWithProviders(<ContactModalDelete />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
        contactDetail: MOCK_DELETE_CONTACT,
      },
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
