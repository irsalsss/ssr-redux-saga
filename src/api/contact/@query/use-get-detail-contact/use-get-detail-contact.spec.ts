import { renderHook, waitFor } from "@/utils/test/react-testing-setup";
import {
  prefetchGetDetailContactsQuery,
  useGetDetailContactsQuery,
} from "./use-get-detail-contact";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";

describe("useGetDetailContactsQuery", () => {
  it("should return GetDetailContacsOutput", async () => {
    const { result } = renderHook(() => useGetDetailContactsQuery(1), {
      wrapper: wrapperReactQuery,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toStrictEqual(
      mapToCamelCase(MOCK_LIST_CONTACT[0])
    );
  });

  it("should run prefetch", async () => {
    const { result } = renderHook(
      async () => await prefetchGetDetailContactsQuery(1),
      {
        wrapper: wrapperReactQuery,
      }
    );

    expect(await result.current).toStrictEqual(
      mapToCamelCase(MOCK_LIST_CONTACT[0])
    );
  });
});
