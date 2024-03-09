import ContactInterface from "@/interfaces/contact/contact.interface";

export const ascendingSortByFirstLastName = (
  a: ContactInterface,
  b: ContactInterface
) => {
  if (a.firstName !== b.firstName) {
    return a.firstName.localeCompare(b.firstName);
  } else {
    return a.lastName.localeCompare(b.lastName);
  }
};

export const descendingSortByFirstLastName = (
  a: ContactInterface,
  b: ContactInterface
) => {
  if (a.firstName !== b.firstName) {
    return b.firstName.localeCompare(a.firstName);
  } else {
    return b.lastName.localeCompare(a.lastName);
  }
};
