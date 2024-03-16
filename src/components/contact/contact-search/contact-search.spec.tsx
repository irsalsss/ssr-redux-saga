import ContactSearch from "./contact-search";
import { renderWithProviders } from "@/utils/test/wrapper-testing";

describe("ContactSearch", () => {
  it("should render ContactSearch successfully", () => {
    const { baseElement } = renderWithProviders(<ContactSearch />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
