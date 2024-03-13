import { render } from "@/utils/test/react-testing-setup";
import ContactModalAddEdit from "./contact-modal-add-edit";
import {
  MOCK_ADD_CONTACT,
  MOCK_CONTACT_FAVORITE,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";
import { WrapperRedux, wrapperReactQuery } from "@/utils/test/wrapper-testing";

describe("ContactModalAddEdit", () => {
  it("should render ContactModalAddEdit successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_ADD_CONTACT,
        }}
      >
        <ContactModalAddEdit favoriteContacts={MOCK_CONTACT_FAVORITE} />
      </WrapperRedux>,
      { wrapper: wrapperReactQuery }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
