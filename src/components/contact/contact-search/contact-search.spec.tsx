import { render } from "@testing-library/react";
import ContactSearch from "./contact-search";
import { WrapperRedux } from "@/utils/test/wrapper-testing";
import {
  MOCK_CONTACT_DETAIL_REDUCER,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";

describe("ContactSearch", () => {
  it("should render ContactSearch successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactSearch />
      </WrapperRedux>
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
