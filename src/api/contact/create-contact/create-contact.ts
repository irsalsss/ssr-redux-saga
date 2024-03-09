import ContactInterface from "@/interfaces/contact/contact.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import mapToSnakeCase from "@/utils/map-to-snake-case/map-to-snake-case";

type CreateContactInput = Omit<ContactInterface, "id"> & {
  id?: number;
};

export interface CreateContactOutput extends ResponseInterface {
  message: string;
  statusCode: number;
  data: ContactInterface;
}

export const createContact = async (
  data: CreateContactInput
): Promise<CreateContactOutput> => {
  const payload = { ...data };

  delete payload.id;

  const body = mapToSnakeCase({
    contact: payload,
  });

  const response = await fetchJson<ResponseInterface>("/api/contacts", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return mapToCamelCase(response);
};

export default createContact;
