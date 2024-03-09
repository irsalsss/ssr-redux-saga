import mapToSnakeCase from "./map-to-snake-case";

describe("mapToSnakeCase", () => {
  it("should return snake case object", () => {
    const object = {
      propertyOne: "value_one",
      propertyTwo: "value_two",
      propertyThree: {
        nestedPropertyOne: "nested_value_one",
        nestedPropertyTwo: "nested_value_two",
      },
    };

    const result = mapToSnakeCase(object);

    expect(result).toStrictEqual({
      property_one: "value_one",
      property_two: "value_two",
      property_three: {
        nested_property_one: "nested_value_one",
        nested_property_two: "nested_value_two",
      },
    });
  });

  it("should return snake case array of object", () => {
    const object = [
      {
        propertyOne: "value_one",
        propertyTwo: "value_two",
        propertyThree: {
          nestedPropertyOne: "nested_value_one",
          nestedPropertyTwo: "nested_value_two",
        },
      },
    ];

    const result = mapToSnakeCase(object);

    expect(result).toStrictEqual([
      {
        property_one: "value_one",
        property_two: "value_two",
        property_three: {
          nested_property_one: "nested_value_one",
          nested_property_two: "nested_value_two",
        },
      },
    ]);
  });
});
