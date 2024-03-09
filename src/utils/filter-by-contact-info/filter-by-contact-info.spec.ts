import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import { filterByContactInfo } from "./filter-by-contact-info";
import mapToCamelCase from "../map-to-camel-case/map-to-camel-case";
import ContactInterface from "@/interfaces/contact/contact.interface";

describe("filterByContactInfo", () => {
  it("should filter data by contact info", () => {
    const result = mapToCamelCase<Array<ContactInterface>>(
      MOCK_LIST_CONTACT
    ).filter((contact) => filterByContactInfo(contact, "jedi knight"));

    expect(result).toStrictEqual([
      {
        id: 1,
        firstName: "Luke",
        lastName: "Skywalker",
        job: "Jedi knight",
        description: "Son of Anakin Skywalker",
      },
    ]);
  });
});
