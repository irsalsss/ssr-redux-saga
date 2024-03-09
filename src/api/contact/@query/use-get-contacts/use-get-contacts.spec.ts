import { renderHook, waitFor } from "@/utils/test/react-testing-setup";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import {
  prefetchGetContactsQuery,
  useGetContactsQuery,
} from "./use-get-contacts";

describe("useGetContacts", () => {
  it("should return GetDetailContacsOutput", async () => {
    const { result } = renderHook(() => useGetContactsQuery(), {
      wrapper: wrapperReactQuery,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toStrictEqual(
      mapToCamelCase(MOCK_LIST_CONTACT)
    );
  });

  it("should run prefetchGetContactsQuery", async () => {
    const { result } = renderHook(
      async () => await prefetchGetContactsQuery(),
      {
        wrapper: wrapperReactQuery,
      }
    );

    expect(await result.current).toStrictEqual(
      mapToCamelCase(MOCK_LIST_CONTACT)
    );
  });
});
