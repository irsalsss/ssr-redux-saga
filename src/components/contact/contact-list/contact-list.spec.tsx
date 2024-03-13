import { render } from "@/utils/test/react-testing-setup";
import { WrapperRedux, wrapperReactQuery } from "@/utils/test/wrapper-testing";
import ContactList from "./contact-list";
import {
  MOCK_CONTACT_DETAIL_REDUCER,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";

describe("ContactList", () => {
  it("should render ContactList successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactList />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
