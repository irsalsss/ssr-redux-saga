import {
  act,
  screen,
  userEvent,
  waitFor,
} from "@/utils/test/react-testing-setup";
import { renderWithProviders } from "@/utils/test/wrapper-testing";
import ContactContainer from "./contact-container";
import {
  MOCK_CONTACT_REDUCER,
  MOCK_DELETE_CONTACT,
} from "@/mocks/contact/contact-mock";

describe("ContactContainer", () => {
  it("should render ContactContainer successfully", () => {
    const { baseElement } = renderWithProviders(<ContactContainer />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
      },
    });

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it("should delete contact", async () => {
    renderWithProviders(<ContactContainer />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
        contactDetail: MOCK_DELETE_CONTACT,
      },
    });

    await waitFor(() => {
      const deleteIcon = screen.getAllByRole("button", {
        name: "delete-icon",
      })[0];
      expect(deleteIcon).toBeVisible();

      userEvent.click(deleteIcon);
    });

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(submitButton).not.toBeDisabled();
    });

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtn);

    act(async () => {
      await waitFor(() => {
        const modalTitle = screen.queryByText("has been deleted");
        expect(modalTitle).toBeVisible();
      });
    });
  });

  it("should favorite contact", async () => {
    renderWithProviders(<ContactContainer />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
      },
    });

    await waitFor(() => {
      const favoriteIcon = screen.getAllByRole("button", {
        name: "star-icon",
      })[0];
      expect(favoriteIcon).toBeVisible();

      userEvent.click(favoriteIcon);
    });

    await waitFor(() => {
      const favoriteIcon = screen.getAllByRole("button", {
        name: "star-filled-icon",
      })[0];
      expect(favoriteIcon).toBeVisible();
    });
  });

  it("should sort by descending", async () => {
    renderWithProviders(<ContactContainer />, {
      preloadedState: {
        contact: MOCK_CONTACT_REDUCER,
      },
    });

    await waitFor(() => {
      const ascendingIcon = screen.getByRole("button", {
        name: "asc-icon",
      });
      expect(ascendingIcon).toBeVisible();

      userEvent.click(ascendingIcon);
    });

    await waitFor(() => {
      const descendingIcon = screen.getByRole("button", {
        name: "desc-icon",
      });
      expect(descendingIcon).toBeVisible();
    });
  });
});
