import { render } from "@/utils/test/react-testing-setup";
import ContactModalAddEdit from "./contact-modal-add-edit";
import { MOCK_FAVORITE_CONTACT } from "@/mocks/contact/contact-mock";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";

describe("ContactModalAddEdit", () => {
  it("should render ContactModalAddEdit successfully", () => {
    const { baseElement } = render(
      <ContactModalAddEdit
        activeId={0}
        onClose={jest.fn()}
        favoriteContacts={MOCK_FAVORITE_CONTACT}
      />,
      { wrapper: wrapperReactQuery }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
