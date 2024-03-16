import Loader from "@/components/shared/loader/loader";
import Modal from "@/components/shared/modal/modal";
import {
  contactDetailActions,
  deleteContactActionDispatcher,
  getContactDetailActionDispatcher,
} from "@/reducers/contact-detail.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect, useMemo } from "react";

const ContactModalDelete = () => {
  const dispatch = useAppDispatch();

  const {
    data: contactDetail,
    isLoading,
    activeModalData,
  } = useAppSelector((state) => state.contactDetail.contactDetail);

  const activeId = activeModalData?.id ?? -1;

  const handleClose = () => {
    dispatch(contactDetailActions.resetContactDetail());
  };

  const handleDeleteContact = () => {
    dispatch(deleteContactActionDispatcher(activeId));
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
      isDisableSubmit={isLoading}
    />
  );
};

export default ContactModalDelete;
