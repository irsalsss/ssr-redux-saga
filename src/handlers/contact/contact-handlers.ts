import { env } from "@/constants/env";
import { MOCK_LIST_CONTACT } from "@/mocks/contact/contact-mock";
import { rest } from "msw";

export const contactHandlers = [
  rest.get(env.API_URL + "/api/contacts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success get contact list!",
        data: MOCK_LIST_CONTACT,
      })
    );
  }),

  rest.get(env.API_URL + "/api/contacts/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success get detail contact!",
        data: MOCK_LIST_CONTACT[0],
      })
    );
  }),

  rest.patch(env.API_URL + "/api/contacts/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success update contact!",
        data: {
          id: 1,
          first_name: "Luke - edited",
          last_name: "Skywalker - edited",
          job: "Jedi knight - edited",
          description: "Son of Anakin Skywalker edited",
        },
      })
    );
  }),

  rest.delete(env.API_URL + "/api/contacts/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success delete contact!",
        data: MOCK_LIST_CONTACT[0],
      })
    );
  }),

  rest.post(env.API_URL + "/api/contacts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success create contact!",
        data: MOCK_LIST_CONTACT[0],
      })
    );
  }),
];
