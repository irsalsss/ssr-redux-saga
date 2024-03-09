import { render } from "@/utils/test/react-testing-setup";
import ContactTab from "./contact-tab";

describe("ContactTab", () => {
  it("should render ContactTab successfully", () => {
    const { baseElement } = render(<ContactTab />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
