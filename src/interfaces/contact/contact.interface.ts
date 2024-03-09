interface ContactInterface {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
  description: string;
}

export type ContactFormField = Omit<ContactInterface, "id">;

export type ContactsInterface = Array<ContactInterface>;

export default ContactInterface;
