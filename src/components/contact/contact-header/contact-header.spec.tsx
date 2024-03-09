import { render } from "@/utils/test/react-testing-setup";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";
import ContactHeader from "./contact-header";

describe("ContactHeader", () => {
  it("should render ContactHeader successfully", () => {
    const { baseElement } = render(<ContactHeader />, {
      wrapper: wrapperReactQuery,
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
