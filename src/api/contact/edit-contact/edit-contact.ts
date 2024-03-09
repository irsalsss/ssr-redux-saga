import ContactInterface from "@/interfaces/contact/contact.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import mapToSnakeCase from "@/utils/map-to-snake-case/map-to-snake-case";

export type EditContactInput = Omit<ContactInterface, "id"> & {
  id?: number;
};

export interface EditContactOutput extends ResponseInterface {
  message: string;
  statusCode: number;
  data: ContactInterface;
}

export const editContact = async (
  data: EditContactInput
): Promise<EditContactOutput> => {
  const body = mapToSnakeCase({
    info: data,
  });

  const response = await fetchJson<ResponseInterface>(
    "/api/contacts/" + data.id,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    }
  );

  return mapToCamelCase(response);
};

export default editContact;
