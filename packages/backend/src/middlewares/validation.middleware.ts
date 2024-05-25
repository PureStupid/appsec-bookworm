import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "@exceptions/HttpException";

/**
 * Middleware function for validating request data.
 *
 * @param type - The class constructor for the object to be validated.
 * @param value - The location of the data to be validated ('body', 'query', or 'params').
 * @param skipMissingProperties - Whether to skip validation for missing properties (default: false).
 * @param whitelist - Whether to only allow properties defined in the class (default: true).
 * @param forbidNonWhitelisted - Whether to forbid properties not defined in the class (default: true).
 * @returns A RequestHandler function that performs the validation.
 */
const validationMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
