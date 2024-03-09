import { render } from "@/utils/test/react-testing-setup";
import Toaster from "./toaster";

describe("Toaster", () => {
  it("should render toaster successfully", () => {
    const { baseElement } = render(<Toaster />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
