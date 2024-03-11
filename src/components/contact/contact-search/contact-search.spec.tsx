import { render } from "@testing-library/react";
import ContactSearch from "./contact-search";

describe("ContactSearch", () => {
  it("should render ContactSearch successfully", () => {
    const { baseElement } = render(<ContactSearch />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
