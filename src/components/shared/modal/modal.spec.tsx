import { render } from "@/utils/test/react-testing-setup";
import Modal from "./modal";

describe("Modal", () => {
  it("should render modal successfully", () => {
    const { baseElement } = render(
      <Modal
        title='Modal'
        content='Are you sure you want to delete the item?'
        onClose={jest.fn}
        onSubmit={jest.fn}
      />
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
