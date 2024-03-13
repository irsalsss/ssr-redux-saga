import { render } from "@/utils/test/react-testing-setup";
import ContactModalDelete from "./contact-modal-delete";
import { WrapperRedux, wrapperReactQuery } from "@/utils/test/wrapper-testing";
import {
  MOCK_CONTACT_REDUCER,
  MOCK_DELETE_CONTACT,
} from "@/mocks/contact/contact-mock";

describe("ContactModalDelete", () => {
  it("should render ContactModalDelete successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_DELETE_CONTACT,
        }}
      >
        <ContactModalDelete />
      </WrapperRedux>,
      { wrapper: wrapperReactQuery }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
