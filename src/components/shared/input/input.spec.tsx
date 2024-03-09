import { render } from "@/utils/test/react-testing-setup";
import Input from "./input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

describe("Input", () => {
  it("should render input successfully", () => {
    const { baseElement } = render(<Input placeholder='Search ...' />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it("should render input with icon and error successfully", () => {
    const { baseElement } = render(
      <Input
        icon={<MagnifyingGlassIcon />}
        error='should be filled'
        placeholder='Search ...'
      />
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
