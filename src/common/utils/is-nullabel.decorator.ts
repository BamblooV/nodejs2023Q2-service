import { ValidationOptions, ValidateIf } from 'class-validator';
/**
 * Checks if given value is null.
 */
export function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}
