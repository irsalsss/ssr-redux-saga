import { renderWithProviders } from "@/utils/test/wrapper-testing";
import ContactList from "./contact-list";
import { MOCK_CONTACT_REDUCER } from "@/mocks/contact/contact-mock";

describe("ContactList", () => {
  it("should render ContactList successfully", () => {
    const { baseElement } = renderWithProviders(<ContactList />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
      },
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
