import ContactInterface from "@/interfaces/contact/contact.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

export interface DeleteContactOutput extends ResponseInterface {
  message: string;
  statusCode: number;
  data: ContactInterface;
}

export const deleteContact = async (
  id: number
): Promise<DeleteContactOutput> => {
  const response = await fetchJson<ResponseInterface>("/api/contacts/" + id, {
    method: "DELETE",
  });

  return mapToCamelCase(response);
};

export default deleteContact;
