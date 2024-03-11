import useCreateContact from "@/api/contact/@mutation/use-create-contact/use-create-contact";
import Modal from "@/components/shared/modal/modal";
import { notify } from "@/components/shared/toaster/toaster";
import ContactInterface, {
  ContactFormField,
} from "@/interfaces/contact/contact.interface";
import { useEffect } from "react";
import Loader from "@/components/shared/loader/loader";
import useEditContact from "@/api/contact/@mutation/use-edit-contact/use-edit-contact";
import { ERROR_NOT_FOUND } from "@/constants/error";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getContactActionDispatcher } from "@/reducers/contact.reducer";
import { getContactDetailActionDispatcher } from "@/reducers/contact-detail.reducer";
import ContactForm from "../contact-form/contact-form";
import { FormProvider, useForm } from "react-hook-form";

interface ContactModalAddEditProps {
  activeId: number;
  onClose: () => void;
  favoriteContacts: Record<number, ContactInterface>;
}

const ContactModalAddEdit = ({
  activeId,
  onClose,
  favoriteContacts,
}: ContactModalAddEditProps) => {
  const isAddMode = activeId === 0;

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const search = useAppSelector((state) => state.contact.contact.search);

  const { data: contactDetail, isLoading } = useAppSelector(
    (state) => state.contactDetail.contactDetail
  );

  const methods = useForm<ContactFormField>({
    mode: "onChange",
    values: contactDetail,
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const { mutate: createContact, isPending: isLoadingCreateContact } =
    useCreateContact();

  const { mutate: editContact, isPending: isLoadingEditContact } =
    useEditContact(activeId);

  const onSubmit = (data: ContactFormField) => {
    const payload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      job: data.job.trim(),
      description: data.description.trim(),
    };

    if (isAddMode) {
      createContact(payload, {
        onSuccess: () => {
          dispatch(getContactActionDispatcher(search));

          notify("Successfully created");
          onClose();
        },
        onError: () => {
          notify("Something went wrong, please try again");
        },
      });

      return;
    }

    editContact(
      { ...payload, id: activeId },
      {
        onSuccess: () => {
          dispatch(getContactActionDispatcher(search));

          queryClient.resetQueries({
            queryKey: ["useGetDetailContactsQuery", activeId],
            exact: true,
          });

          const isFavorite = Object.prototype.hasOwnProperty.call(
            favoriteContacts,
            activeId
          );
          if (isFavorite) {
            favoriteContacts[activeId] = { ...payload, id: activeId };
          }

          localStorage.setItem("favorites", JSON.stringify(favoriteContacts));

          notify("Successfully edited");
          onClose();
        },
        onError: (response) => {
          if (response.statusCode === ERROR_NOT_FOUND) {
            notify(response.message);
            return;
          }

          notify(`Something went wrong, please try again`);
        },
      }
    );
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
      onClose={onClose}
      onSubmit={methods.handleSubmit(onSubmit)}
      isDisableSubmit={
        !isDirty || !isValid || isLoadingCreateContact || isLoadingEditContact
      }
      size='large'
    />
  );
};

export default ContactModalAddEdit;
