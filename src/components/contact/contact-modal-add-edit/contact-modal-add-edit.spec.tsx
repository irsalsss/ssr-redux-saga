import ContactModalAddEdit from "./contact-modal-add-edit";
import {
  MOCK_ADD_CONTACT,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";
import { renderWithProviders } from "@/utils/test/wrapper-testing";

describe("ContactModalAddEdit", () => {
  it("should render ContactModalAddEdit successfully", () => {
    const { baseElement } = renderWithProviders(<ContactModalAddEdit />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
        contactDetail: MOCK_ADD_CONTACT,
      },
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
