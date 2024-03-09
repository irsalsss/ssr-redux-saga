import { useCallback, useEffect, useMemo } from "react";
import ContactCard from "../contact-card/contact-card";
import useContactStore from "@/stores/contact/use-contact-store";
import { useShallow } from "zustand/react/shallow";
import useDeleteContact from "@/api/contact/@mutation/use-delete-contact/use-delete-contact";
import { notify } from "@/components/shared/toaster/toaster";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";
import { ERROR_NOT_FOUND } from "@/constants/error";
import Modal from "@/components/shared/modal/modal";
import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import { filterByContactInfo } from "@/utils/filter-by-contact-info/filter-by-contact-info";
import {
  ascendingSortByFirstLastName,
  descendingSortByFirstLastName,
} from "@/utils/sort-by-first-last-name/sort-by-first-last-name";
import ContactModalAddEdit from "../contact-modal-add-edit/contact-modal-add-edit";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getActionDispatcher } from "@/reducers/contact.reducer";

const ContactList = () => {
  const dispatch = useAppDispatch();
  const { data: contacts, isLoading } = useAppSelector(
    (state) => state.contact.contact
  );

  const [
    isAscending,

    search,
    activeTab,

    activeModalContact,
    setActiveModalContact,
    handleCloseActiveModalContact,

    favoriteContacts,
    setFavoriteContacts,
  ] = useContactStore(
    useShallow((state) => [
      state.isAscending,

      state.search,
      state.activeTab,

      state.activeModalContact,
      state.setActiveModalContact,
      state.handleCloseActiveModalContact,

      state.favoriteContacts,
      state.setFavoriteContacts,
    ])
  );

  const { mutate: deleteContact, isPending: isPendingDelete } =
    useDeleteContact(activeModalContact.id);

  const handleOpenModalDelete = (contact: ContactInterface) => {
    const isFavorite = Object.prototype.hasOwnProperty.call(
      favoriteContacts,
      contact.id
    );

    if (isFavorite) {
      notify(`You can't delete it. Please unfavorite first`);

      return;
    }

    setActiveModalContact({
      ...contact,
      type: ModalTypeEnum.DELETE,
    });
  };

  const handleOpenModalEdit = (contact: ContactInterface) => {
    setActiveModalContact({
      ...contact,
      type: ModalTypeEnum.EDIT,
    });
  };

  const handleDeleteContact = () => {
    deleteContact(activeModalContact.id, {
      onSuccess: () => {
        handleCloseActiveModalContact();
        notify(
          `${activeModalContact.firstName} ${activeModalContact.lastName} has been deleted`
        );

        dispatch(getActionDispatcher(search));
      },
      onError: (response) => {
        if (response.statusCode === ERROR_NOT_FOUND) {
          notify(response.message);
          return;
        }

        notify(`Something went wrong, please try again`);
      },
    });
  };

  const handleFavoriteContact = useCallback(
    (contact: ContactInterface) => {
      const currentFavorites = { ...favoriteContacts };

      if (Object.prototype.hasOwnProperty.call(favoriteContacts, contact.id)) {
        delete currentFavorites[contact.id];
        notify(
          `${contact.firstName} ${contact.lastName} has been removed from favorite`
        );
      } else {
        currentFavorites[contact.id] = contact;
        notify(
          `${contact.firstName} ${contact.lastName} has been added to favorite`
        );
      }

      setFavoriteContacts(currentFavorites);
      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    },
    [favoriteContacts]
  );

  const currentContacts = useMemo(() => {
    const list =
      activeTab === ContactTabEnum.ALL
        ? [...contacts]
        : Object.values(favoriteContacts);

    let sortedList = list;

    if (isAscending) {
      sortedList = list.sort(ascendingSortByFirstLastName);
    } else {
      sortedList = list.sort(descendingSortByFirstLastName);
    }

    if (search.length > 0) {
      return sortedList.filter((contact) =>
        filterByContactInfo(contact, search)
      );
    }

    return sortedList;
  }, [activeTab, favoriteContacts, contacts, search, isAscending]);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const favContacs = JSON.parse(localFavorites);
      setFavoriteContacts(favContacs ?? {});
    }
  }, []);

  return (
    <>
      {!isLoading && currentContacts.length === 0 ? (
        <div className='flex justify-center items-center p-8 mt-8'>
          <h5>
            The {activeTab === ContactTabEnum.ALL ? "contacts" : "favorites"}{" "}
            {search.length ? "you've searched" : ""} are empty...
          </h5>
        </div>
      ) : null}

      <div className='flex flex-wrap gap-4 px-4 mt-4'>
        {currentContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isFavorite={Object.prototype.hasOwnProperty.call(
              favoriteContacts,
              contact.id
            )}
            onEditContact={() => handleOpenModalEdit(contact)}
            onFavoriteContact={() => handleFavoriteContact(contact)}
            onDeleteContact={() => handleOpenModalDelete(contact)}
          />
        ))}
      </div>

      {activeModalContact.type === ModalTypeEnum.DELETE ? (
        <Modal
          title='Delete Contact'
          content='Are you sure want to delete this contact?'
          onClose={handleCloseActiveModalContact}
          onSubmit={handleDeleteContact}
          isDisableSubmit={isPendingDelete}
        />
      ) : null}

      {[ModalTypeEnum.ADD, ModalTypeEnum.EDIT].includes(
        activeModalContact.type
      ) ? (
        <ContactModalAddEdit
          activeId={activeModalContact.id}
          onClose={handleCloseActiveModalContact}
          favoriteContacts={favoriteContacts}
        />
      ) : null}
    </>
  );
};

export default ContactList;
