import { env } from "@/constants/env";

import * as uuid from "uuid";

export class CustomError extends Error {
  statusCode: number;
  api?: string;

  constructor(
    message: string,
    { statusCode, api }: { statusCode: number; api?: string }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.api = api;
  }
}

export const fetchJson = async <JSONDataType = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSONDataType> => {
  const url = env.API_URL + input;

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Request-ID": uuid.v4(),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new CustomError(response.statusText, {
      statusCode: response.status,
      api: url,
    });
  }

  if (!response.ok) {
    throw new CustomError(data.message, {
      statusCode: data.statusCode,
      api: url,
    });
  }

  return data;
};

export default fetchJson;
