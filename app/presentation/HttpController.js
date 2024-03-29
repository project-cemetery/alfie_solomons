import { isValid, parseISO } from "date-fns";

import { InvalidQueryException } from "./error/InvalidQueryException.js";

export class HttpController {
  constructor({ exchangeRateFinder, errorHandler }) {
    this.exchangeRateFinder = exchangeRateFinder;
    this.errorHandler = errorHandler;
  }

  docs = {
    schema: {
      description: "Convert money from one currency to another for exact date",
      summary: "Convert money",
      query: {
        from: {
          type: "string",
          description: "Original currency",
        },
        to: {
          type: "string",
          description: "Target currency",
        },
        date: {
          type: "string",
          format: "date",
          description: "Date of transaction",
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            from: {
              type: "string",
            },
            to: { type: "string" },
            date: { type: "string", format: "date" },
            rate: { type: "number" },
            source: { type: "string" },
            accurate: {
              type: "boolean",
            },
            execution: { type: "string" },
          },
        },
        400: {
          description: "Invalid request",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            query: {
              type: "object",
            },
          },
        },
      },
    },
  };

  handle = async ({ query }, reply) =>
    this.errorHandler.invoke(reply, async () => {
      await this.#throwUnlessValid(query);

      const { from, to, date } = query;

      const sourceCurrency = from.toUpperCase();
      const targetCurrency = to.toUpperCase();
      const when = parseISO(date);

      return this.exchangeRateFinder.find(sourceCurrency, targetCurrency, when);
    });

  #throwUnlessValid = async (query) => {
    const requestIsValid = () => {
      try {
        const { from, to, date } = query;

        const fromValid = from && from.length === 3;
        const toValid = to && to.length === 3;
        const dateValid = isValid(parseISO(date));

        return fromValid && toValid && dateValid;
      } catch (error) {
        return false;
      }
    };

    if (!requestIsValid()) {
      throw new InvalidQueryException(query);
    }
  };
}
