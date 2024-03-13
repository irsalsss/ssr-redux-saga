import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { MOCK_CONTACT_LIST } from "@/mocks/contact/contact-mock";
import createContact from "./create-contact";

describe("createContact", () => {
  it("should return CreateContactOutput", async () => {
    const output = await createContact({
      firstName: "Luke",
      lastName: "Skywalker",
      job: "Jedi knight",
      description: "Son of Anakin Skywalker",
    });

    expect(output).toStrictEqual(
      mapToCamelCase({
        status_code: 200,
        message: "Success create contact!",
        data: MOCK_CONTACT_LIST[0],
      })
    );
  });
});
