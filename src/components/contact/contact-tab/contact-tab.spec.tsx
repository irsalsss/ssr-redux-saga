import ContactTab from "./contact-tab";
import { renderWithProviders } from "@/utils/test/wrapper-testing";

describe("ContactTab", () => {
  it("should render ContactTab successfully", () => {
    const { baseElement } = renderWithProviders(<ContactTab />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
