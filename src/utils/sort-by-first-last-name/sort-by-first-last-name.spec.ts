import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import {
  ascendingSortByFirstLastName,
  descendingSortByFirstLastName,
} from "./sort-by-first-last-name";
import mapToCamelCase from "../map-to-camel-case/map-to-camel-case";
import ContactInterface from "@/interfaces/contact/contact.interface";

describe("sortByFirstLastName", () => {
  it("should sort by ascending", () => {
    const result = mapToCamelCase<Array<ContactInterface>>(
      MOCK_LIST_CONTACT
    ).sort(ascendingSortByFirstLastName);

    expect(result).toStrictEqual([
      {
        description: "I am your father!",
        firstName: "Darth",
        id: 5,
        job: "Sith lord",
        lastName: "Vader",
      },
      {
        description: "Partnered with a famous Wookie",
        firstName: "Han",
        id: 3,
        job: "Smuggler",
        lastName: "Solo",
      },
      {
        description: "Luke's secret twin sister",
        firstName: "Leia",
        id: 4,
        job: "Princess",
        lastName: "Organa",
      },
      {
        description: "Son of Anakin Skywalker",
        firstName: "Luke",
        id: 1,
        job: "Jedi knight",
        lastName: "Skywalker",
      },
      {
        description: "Old Ben was trained by Qui-Gon Jinn",
        firstName: "Obi-Wan",
        id: 2,
        job: "Jedi master",
        lastName: "Kenobi",
      },
    ]);
  });

  it("should sort by descending", () => {
    const result = mapToCamelCase<Array<ContactInterface>>(
      MOCK_LIST_CONTACT
    ).sort(descendingSortByFirstLastName);

    expect(result).toStrictEqual([
      {
        description: "Old Ben was trained by Qui-Gon Jinn",
        firstName: "Obi-Wan",
        id: 2,
        job: "Jedi master",
        lastName: "Kenobi",
      },
      {
        description: "Son of Anakin Skywalker",
        firstName: "Luke",
        id: 1,
        job: "Jedi knight",
        lastName: "Skywalker",
      },
      {
        description: "Luke's secret twin sister",
        firstName: "Leia",
        id: 4,
        job: "Princess",
        lastName: "Organa",
      },
      {
        description: "Partnered with a famous Wookie",
        firstName: "Han",
        id: 3,
        job: "Smuggler",
        lastName: "Solo",
      },
      {
        description: "I am your father!",
        firstName: "Darth",
        id: 5,
        job: "Sith lord",
        lastName: "Vader",
      },
    ]);
  });
});
