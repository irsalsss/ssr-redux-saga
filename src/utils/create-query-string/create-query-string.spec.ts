import { createQueryString } from "./create-query-string";

describe("createQueryString", () => {
  it("should return query string", () => {
    const query = "page=1";

    const result = createQueryString(query, "search", "luke sky");

    expect(result).toStrictEqual("page=1&search=luke+sky");
  });
});
