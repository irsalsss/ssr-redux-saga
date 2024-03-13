import { render } from "@/utils/test/react-testing-setup";
import { WrapperRedux, wrapperReactQuery } from "@/utils/test/wrapper-testing";
import ContactHeader from "./contact-header";
import {
  MOCK_CONTACT_DETAIL_REDUCER,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";

describe("ContactHeader", () => {
  it("should render ContactHeader successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactHeader />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
