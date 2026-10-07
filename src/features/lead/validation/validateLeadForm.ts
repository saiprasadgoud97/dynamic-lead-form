import type {
  FieldConfig,
  LeadFormValues,
} from "../types/lead.types";

export type FormErrors = Record<string, string>;

export function validateLeadForm(
  config: FieldConfig[],
  values: LeadFormValues
): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    // Skip fields that are currently hidden.
    if (
      field.condition &&
      !field.condition(values)
    ) {
      continue;
    }

    const value = values[field.name];

    for (const rule of field.validations ?? []) {
      // Stop after the first error for this field.
      if (errors[field.name]) {
        break;
      }

      switch (rule.type) {
        case "required":
          if (
            value === "" ||
            value === false ||
            value === null ||
            value === undefined
          ) {
            errors[field.name] = rule.message;
          }
          break;

        case "email":
          if (
            typeof value === "string" &&
            value !== "" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            errors[field.name] = rule.message;
          }
          break;

        case "digits":
          if (
            typeof value === "string" &&
            value !== "" &&
            !new RegExp(`^\\d{${rule.length}}$`).test(value)
          ) {
            errors[field.name] = rule.message;
          }
          break;

        case "maxLength":
          if (
            typeof value === "string" &&
            value.length > rule.value
          ) {
            errors[field.name] = rule.message;
          }
          break;
      }
    }
  }

  return errors;
}