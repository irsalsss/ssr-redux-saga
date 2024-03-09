import ContactInterface from "@/interfaces/contact/contact.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

interface GetDetailContactsData {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

export type GetDetailContactsOutput = ContactInterface;

interface GetDetailContactsResponse extends ResponseInterface {
  data: GetDetailContactsData;
}

export const getDetailContacts = async (
  id: number
): Promise<GetDetailContactsOutput> => {
  const response = await fetchJson<GetDetailContactsResponse>(
    "/api/contacts/" + id
  );

  return mapToCamelCase(response.data);
};
