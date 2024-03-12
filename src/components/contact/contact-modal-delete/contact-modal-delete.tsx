import useDeleteContact from "@/api/contact/@mutation/use-delete-contact/use-delete-contact";
import Loader from "@/components/shared/loader/loader";
import Modal from "@/components/shared/modal/modal";
import { notify } from "@/components/shared/toaster/toaster";
import { ERROR_NOT_FOUND } from "@/constants/error";
import {
  contactDetailActions,
  getContactDetailActionDispatcher,
} from "@/reducers/contact-detail.reducer";
import { getContactActionDispatcher } from "@/reducers/contact.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect, useMemo } from "react";

const ContactModalDelete = () => {
  const dispatch = useAppDispatch();

  const search =
    useAppSelector((state) => state.contact.contact.filter.search) || "";

  const {
    data: contactDetail,
    isLoading,
    activeModalData,
  } = useAppSelector((state) => state.contactDetail.contactDetail);

  const activeId = activeModalData?.id ?? -1;

  const { mutate: deleteContact, isPending: isPendingDelete } =
    useDeleteContact(activeId);

  const handleClose = () => {
    dispatch(contactDetailActions.resetContactDetail());
  };

  const handleDeleteContact = () => {
    deleteContact(activeId, {
      onSuccess: () => {
        handleClose();
        notify(
          `${contactDetail.firstName} ${contactDetail.lastName} has been deleted`
        );

        dispatch(getContactActionDispatcher(search));
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

  useEffect(() => {
    dispatch(getContactDetailActionDispatcher(activeId));
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className='flex justify-center w-full'>
          <Loader />
        </div>
      );
    }

    return `Are you sure want to delete ${contactDetail.firstName} ${contactDetail.lastName}?`;
  }, [isLoading]);

  return (
    <Modal
      title='Delete Contact'
      content={content}
      onClose={handleClose}
      onSubmit={handleDeleteContact}
      isDisableSubmit={isPendingDelete || isLoading}
    />
  );
};

export default ContactModalDelete;
