import Input from "@/components/shared/input/input";
import ContactInterface, {
  ContactFormField,
} from "@/interfaces/contact/contact.interface";
import { contactValidation } from "@/validations/contact/contact.validation";
import { Controller, useFormContext } from "react-hook-form";

interface ContactFormProps {
  contactDetail: ContactInterface;
}

const ContactForm = ({ contactDetail }: ContactFormProps) => {
  const { control } = useFormContext<ContactFormField>();

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='firstName'>First name:</label>

        <Controller
          name='firstName'
          control={control}
          defaultValue={contactDetail?.firstName || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.firstName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='firstName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Last name:</label>

        <Controller
          name='lastName'
          control={control}
          defaultValue={contactDetail?.lastName || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.lastName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='lastName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Job:</label>

        <Controller
          name='job'
          control={control}
          defaultValue={contactDetail?.job || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.job,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='job'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Description:</label>

        <Controller
          name='description'
          control={control}
          defaultValue={contactDetail?.description || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.description,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='description'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ContactForm;
