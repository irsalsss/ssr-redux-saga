import { render } from "@/utils/test/react-testing-setup";
import Loader from "./loader";

describe("Loader", () => {
  it("should render loader successfully", () => {
    const { baseElement } = render(<Loader />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
