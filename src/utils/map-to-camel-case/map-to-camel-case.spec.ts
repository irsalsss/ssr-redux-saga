import mapToCamelCase from "./map-to-camel-case";

describe("mapToCamelCase", () => {
  it("should return camel case object", () => {
    const object = {
      property_one: "value_one",
      property_two: "value_two",
      property_three: {
        nested_property_one: "nested_value_one",
        nested_property_two: "nested_value_two",
      },
    };

    const result = mapToCamelCase(object);

    expect(result).toStrictEqual({
      propertyOne: "value_one",
      propertyTwo: "value_two",
      propertyThree: {
        nestedPropertyOne: "nested_value_one",
        nestedPropertyTwo: "nested_value_two",
      },
    });
  });

  it("should return camel case array of object", () => {
    const object = [
      {
        property_one: "value_one",
        property_two: "value_two",
        property_three: {
          nested_property_one: "nested_value_one",
          nested_property_two: "nested_value_two",
        },
      },
    ];

    const result = mapToCamelCase(object);

    expect(result).toStrictEqual([
      {
        propertyOne: "value_one",
        propertyTwo: "value_two",
        propertyThree: {
          nestedPropertyOne: "nested_value_one",
          nestedPropertyTwo: "nested_value_two",
        },
      },
    ]);
  });
});
