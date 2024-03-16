import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import deleteContact from "./delete-contact";
import { MOCK_CONTACT_LIST } from "@/mocks/contact/contact-mock";

describe("deleteContact", () => {
  it("should return DeleteContactOutput", async () => {
    const output = await deleteContact(1);

    expect(output).toStrictEqual(mapToCamelCase(MOCK_CONTACT_LIST[0]));
  });
});
