import ButtonIcon from "@/components/shared/button-icon/button-icon";
import { notify } from "@/components/shared/toaster/toaster";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";
import { contactDetailActions } from "@/reducers/contact-detail/contact-detail.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

interface ContactDeleteButtonProps {
  contact: ContactInterface;
}

const ContactDeleteButton = ({ contact }: ContactDeleteButtonProps) => {
  const dispatch = useAppDispatch();

  const favoriteContacts = useAppSelector(
    (state) => state.contact.contact.favoriteContacts
  );

  const handleOpenModalDelete = () => {
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

  return (
    <ButtonIcon label='delete-icon' onClick={handleOpenModalDelete}>
      <TrashIcon />
    </ButtonIcon>
  );
};

export default ContactDeleteButton;
