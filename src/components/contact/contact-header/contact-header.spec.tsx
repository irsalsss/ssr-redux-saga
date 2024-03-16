import { renderWithProviders } from "@/utils/test/wrapper-testing";
import ContactHeader from "./contact-header";
import { MOCK_CONTACT_REDUCER } from "@/mocks/contact/contact-mock";

describe("ContactHeader", () => {
  it("should render ContactHeader successfully", () => {
    const { baseElement } = renderWithProviders(<ContactHeader />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
      },
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
