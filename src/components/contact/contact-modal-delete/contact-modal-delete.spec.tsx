import { render } from "@/utils/test/react-testing-setup";
import ContactModalDelete from "./contact-modal-delete";

describe("ContactModalDelete", () => {
  it("should render ContactModalDelete successfully", () => {
    const { baseElement } = render(<ContactModalDelete />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
