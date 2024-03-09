import { render } from "@/utils/test/react-testing-setup";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";
import ContactList from "./contact-list";

describe("ContactList", () => {
  it("should render ContactList successfully", () => {
    const { baseElement } = render(<ContactList />, {
      wrapper: wrapperReactQuery,
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
