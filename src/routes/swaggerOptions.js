import { SERVER_URL, API_URL } from "../config.js";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Deportes S.A",
      version: "1.0.0",
      description: "Api para la empresa deportes S.A",
    },
    servers: [
      {
        url: SERVER_URL,
      },
    ],
  },
  apis: [API_URL]
}