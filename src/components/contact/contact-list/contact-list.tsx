import { useCallback, useEffect, useMemo } from "react";
import ContactCard from "../contact-card/contact-card";
import { notify } from "@/components/shared/toaster/toaster";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";
import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import { filterByContactInfo } from "@/utils/filter-by-contact-info/filter-by-contact-info";
import {
  ascendingSortByFirstLastName,
  descendingSortByFirstLastName,
} from "@/utils/sort-by-first-last-name/sort-by-first-last-name";
import ContactModalAddEdit from "../contact-modal-add-edit/contact-modal-add-edit";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { contactDetailActions } from "@/reducers/contact-detail/contact-detail.reducer";
import ContactModalDelete from "../contact-modal-delete/contact-modal-delete";
import SortByEnum from "@/enum/shared/sort-by.enum";
import { contactActions } from "@/reducers/contact/contact.reducer";

const ContactList = () => {
  const dispatch = useAppDispatch();

  const {
    data: contacts,
    isLoading,
    activeTab,
    favoriteContacts = {},
  } = useAppSelector((state) => state.contact.contact);

  const { search = "", sortBy } = useAppSelector(
    (state) => state.contact.contact.filter
  );

  const isAscending = sortBy === SortByEnum.ASC;

  const activeModalData = useAppSelector(
    (state) => state.contactDetail.contactDetail.activeModalData
  );

  const handleOpenModalDelete = (contact: ContactInterface) => {
    const isFavorite = Object.prototype.hasOwnProperty.call(
      favoriteContacts,
      contact.id
    );

    if (isFavorite) {
      notify(`You can't delete it. Please unfavorite first`);
      return;
    }

    dispatch(
      contactDetailActions.openModalContact({
        type: ModalTypeEnum.DELETE,
        id: contact.id,
      })
    );
  };

  const handleOpenModalEdit = (contact: ContactInterface) => {
    dispatch(
      contactDetailActions.openModalContact({
        type: ModalTypeEnum.EDIT,
        id: contact.id,
      })
    );
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

      dispatch(contactActions.setFavoriteContacts(currentFavorites));
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
      dispatch(contactActions.setFavoriteContacts(favContacs ?? {}));
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

      <div className='gap-4 px-4 mt-4 grid-cols-3'>
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

      {activeModalData!.type === ModalTypeEnum.DELETE ? (
        <ContactModalDelete />
      ) : null}

      {[ModalTypeEnum.ADD, ModalTypeEnum.EDIT].includes(
        activeModalData!.type
      ) ? (
        <ContactModalAddEdit />
      ) : null}
    </>
  );
};

export default ContactList;
