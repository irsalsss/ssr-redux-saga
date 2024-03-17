import Modal from "@/components/shared/modal/modal";
import { ContactFormField } from "@/interfaces/contact/contact.interface";
import { useEffect } from "react";
import Loader from "@/components/shared/loader/loader";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  contactDetailActions,
  createContactActionDispatcher,
  editContactActionDispatcher,
  getContactDetailActionDispatcher,
} from "@/reducers/contact-detail/contact-detail.reducer";
import ContactForm from "../contact-form/contact-form";
import { FormProvider, useForm } from "react-hook-form";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";

const ContactModalAddEdit = () => {
  const dispatch = useAppDispatch();

  const {
    data: contactDetail,
    isLoading,
    isLoadingAddEdit,
    activeModalData,
  } = useAppSelector((state) => state.contactDetail.contactDetail);

  const isAddMode = activeModalData?.type === ModalTypeEnum.ADD;

  const activeId = activeModalData?.id ?? -1;

  const methods = useForm<ContactFormField>({
    mode: "onChange",
    values: contactDetail,
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const handleClose = () => {
    dispatch(contactDetailActions.resetContactDetail());
  };

  const onSubmit = (data: ContactFormField) => {
    const payload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      job: data.job.trim(),
      description: data.description.trim(),
    };

    if (isAddMode) {
      dispatch(createContactActionDispatcher(payload));
      return;
    }

    dispatch(editContactActionDispatcher({ ...payload, id: activeId }));
  };

  useEffect(() => {
    dispatch(getContactDetailActionDispatcher(activeId));
  }, []);

  const content = (
    <FormProvider {...methods}>
      <ContactForm contactDetail={contactDetail} />
    </FormProvider>
  );

  const loaderContent = (
    <div className='flex justify-center h-full mt-8'>
      <Loader />
    </div>
  );

  return (
    <Modal
      title={isAddMode ? "Add Contact" : "Edit Contact"}
      content={!isAddMode && isLoading ? loaderContent : content}
      onClose={handleClose}
      onSubmit={methods.handleSubmit(onSubmit)}
      isDisableSubmit={!isDirty || !isValid || isLoadingAddEdit}
      size='large'
    />
  );
};

export default ContactModalAddEdit;
