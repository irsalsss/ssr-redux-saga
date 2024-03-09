import editContact from "./edit-contact";

describe("editContact", () => {
  it("should return EditContactOutput", async () => {
    const data = {
      id: 1,
      firstName: "Luke - edited",
      lastName: "Skywalker - edited",
      job: "Jedi knight - edited",
      description: "Son of Anakin Skywalker edited",
    };

    const output = await editContact(data);

    expect(output).toStrictEqual({
      statusCode: 200,
      message: "Success update contact!",
      data,
    });
  });
});
