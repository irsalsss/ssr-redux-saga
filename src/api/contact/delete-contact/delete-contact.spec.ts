import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import deleteContact from "./delete-contact";
import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";

describe("deleteContact", () => {
  it("should return DeleteContactOutput", async () => {
    const output = await deleteContact(1);

    expect(output).toStrictEqual(
      mapToCamelCase({
        status_code: 200,
        message: "Success delete contact!",
        data: MOCK_LIST_CONTACT[0],
      })
    );
  });
});
