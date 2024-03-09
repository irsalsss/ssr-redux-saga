import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import { getContacts } from "./get-contacts";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

describe("getContacts", () => {
  it("should return GetContactsOutput", async () => {
    const output = await getContacts();

    expect(output).toStrictEqual(mapToCamelCase(MOCK_LIST_CONTACT));
  });
});
