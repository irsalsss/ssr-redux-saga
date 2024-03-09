import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import fetchJson from "./fetch-json";

describe("fetchJson", () => {
  it("should return GetContactsOutput", async () => {
    const output = await fetchJson("/api/contacts");

    expect(output).toStrictEqual({
      data: MOCK_LIST_CONTACT,
      message: "Success get contact list!",
      status_code: 200,
    });
  });
});
