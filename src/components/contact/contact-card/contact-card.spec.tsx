import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/test/react-testing-setup";
import ContactCard from "./contact-card";

describe("ContactCard", () => {
  it("should render contact card successfully", () => {
    const { baseElement } = render(
      <ContactCard
        isFavorite={true}
        onDeleteContact={jest.fn}
        onEditContact={jest.fn}
        onFavoriteContact={jest.fn}
        contact={{
          id: 1,
          firstName: "James",
          lastName: "Bond",
          job: "Software Engineer",
          description: "Cool guy from Land of Dawn",
        }}
      />
    );

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it("should click favorite, edit and delete icon", async () => {
    const onEditContact = jest.fn();
    const onDeletedContact = jest.fn();
    const onFavoriteContact = jest.fn();

    render(
      <ContactCard
        isFavorite={false}
        onDeleteContact={onDeletedContact}
        onEditContact={onEditContact}
        onFavoriteContact={onFavoriteContact}
        contact={{
          id: 1,
          firstName: "James",
          lastName: "Bond",
          job: "Software Engineer",
          description: "Cool guy from Land of Dawn",
        }}
      />
    );

    const editIcon = screen.getByRole("button", { name: "edit-icon" });
    userEvent.click(editIcon);

    const deleteIcon = screen.getByRole("button", { name: "delete-icon" });
    userEvent.click(deleteIcon);

    const favIcon = screen.getByRole("button", { name: "star-icon" });
    userEvent.click(favIcon);

    await waitFor(() => {
      expect(onEditContact).toHaveBeenCalled();
      expect(onDeletedContact).toHaveBeenCalled();
      expect(onFavoriteContact).toHaveBeenCalled();
    });
  });
});
