import { ContactFormField } from "@/interfaces/contact/contact.interface";
import { Validator } from "@/interfaces/shared/validator";

const generalValidation = (value: string, maxLength?: number) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = maxLength ?? 15;

  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Should be at-least 3 - ${MAX_LENGTH} characters`;
  }

  return true;
};

export const contactValidation: Validator<ContactFormField> = {
  firstName: (value) => generalValidation(value, 15),
  lastName: (value) => generalValidation(value, 15),
  job: (value) => generalValidation(value, 25),
  description: (value) => generalValidation(value, 40),
};
