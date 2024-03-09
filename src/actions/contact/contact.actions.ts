import ContactActionEnum from "@/enum/contact/contact-action.enum";
import ContactInterface from "@/interfaces/contact/contact.interface";

export const fetchContactRequest = () => ({
  type: ContactActionEnum.FETCH_CONTACT_REQUEST,
});

export const fetchContactSuccess = (data: Array<ContactInterface>) => ({
  type: ContactActionEnum.FETCH_CONTACT_SUCCESS,
  payload: data,
});

export const fetchContactFailure = (error: string) => ({
  type: ContactActionEnum.FETCH_CONTACT_FAILURE,
  payload: error,
});
