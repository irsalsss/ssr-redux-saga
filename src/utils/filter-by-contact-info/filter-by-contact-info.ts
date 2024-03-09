import ContactInterface from "@/interfaces/contact/contact.interface";
import { lowerCase } from "lodash-es";

export const filterByContactInfo = (
  contact: ContactInterface,
  search: string
) => {
  const modifiedSearch = lowerCase(search.trim());

  return (
    lowerCase(contact.description).includes(modifiedSearch) ||
    lowerCase(contact.job).includes(modifiedSearch) ||
    lowerCase(contact.firstName + " " + contact.lastName).includes(
      modifiedSearch
    )
  );
};
