import { useMutation } from "@tanstack/react-query";
import createContact from "../../create-contact/create-contact";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: createContact,
    mutationKey: ["useCreateContact"],
  });
};

export default useCreateContact;
