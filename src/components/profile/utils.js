import { ERRORS } from "./conts";

export function formatError(e) {
  if (e.name === "ZodError") {
    return ERRORS.DECODE;
  }
  if (typeof e === "string") {
    return e;
  }
  if (e instanceof Error || e.message) {
    return e.message;
  }
}
