import { contactHandlers } from "@/handlers/contact/contact-handlers";
import { setupServer } from "msw/node";

const handlers = [...contactHandlers];

export const server = setupServer(...handlers);
