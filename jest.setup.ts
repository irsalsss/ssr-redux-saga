import { server } from "./src/mocks/server";
import "@testing-library/jest-dom";

import "whatwg-fetch";

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: "",
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      pathname: "",
      query: {},
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
