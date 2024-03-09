import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { getDetailContacts } from "./get-detail-contact";

describe("getDetailContacts", () => {
  it("should return GetDetailContactsOutput", async () => {
    const output = await getDetailContacts(1);

    expect(output).toStrictEqual(mapToCamelCase(MOCK_LIST_CONTACT[0]));
  });
});
