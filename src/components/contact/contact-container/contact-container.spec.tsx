import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/test/react-testing-setup";
import { WrapperRedux, wrapperReactQuery } from "@/utils/test/wrapper-testing";
import ContactContainer from "./contact-container";
import {
  MOCK_CONTACT_DETAIL_REDUCER,
  MOCK_CONTACT_REDUCER,
} from "@/mocks/contact/contact-mock";

describe("ContactContainer", () => {
  it("should render ContactContainer successfully", () => {
    const { baseElement } = render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactContainer />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it("should delete contact", async () => {
    render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactContainer />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

    await waitFor(() => {
      const deleteIcon = screen.getAllByRole("button", {
        name: "delete-icon",
      })[0];
      expect(deleteIcon).toBeVisible();

      userEvent.click(deleteIcon);
    });

    await waitFor(() => {
      const modalTitle = screen.getByText("Delete Contact");
      expect(modalTitle).toBeVisible();
    });

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtn);

    await waitFor(() => {
      const modalTitle = screen.queryByText("Delete Contact");
      expect(modalTitle).toBeNull();
    });
  });

  it("should favorite contact", async () => {
    render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactContainer />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

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
    render(
      <WrapperRedux
        initialState={{
          contact: MOCK_CONTACT_REDUCER,
          contactDetail: MOCK_CONTACT_DETAIL_REDUCER,
        }}
      >
        <ContactContainer />
      </WrapperRedux>,
      {
        wrapper: wrapperReactQuery,
      }
    );

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
