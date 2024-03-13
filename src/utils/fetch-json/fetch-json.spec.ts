import { MOCK_CONTACT_LIST } from "@/mocks/contact/contact-mock";
import fetchJson from "./fetch-json";

describe("fetchJson", () => {
  it("should return GetContactsOutput", async () => {
    const output = await fetchJson("/api/contacts");

    expect(output).toStrictEqual({
      data: MOCK_CONTACT_LIST,
      message: "Success get contact list!",
      status_code: 200,
    });
  });
});
