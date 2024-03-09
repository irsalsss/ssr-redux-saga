import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  GetContactsOutput,
  getContacts,
} from "../../get-contacts/get-contacts";
import { CustomError } from "@/utils/fetch-json/fetch-json";
import queryClient from "@/utils/query-client/query-client";

export const useGetContactsQuery = (
  options?: Omit<
    UseQueryOptions<GetContactsOutput, CustomError, GetContactsOutput>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<GetContactsOutput, CustomError, GetContactsOutput>({
    ...options,
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
  });
};

export const prefetchGetContactsQuery = async () => {
  let data: GetContactsOutput;

  try {
    data = await getContacts();
  } catch (error) {
    data = [];

    throw new CustomError((error as CustomError).message, {
      api: (error as CustomError).api,
      statusCode: (error as CustomError).statusCode,
    });
  }

  await queryClient.prefetchQuery({
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
  });

  return data;
};
