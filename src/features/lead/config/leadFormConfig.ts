import type { FieldConfig } from "../types/lead.types";

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    validations: [
      {
        type: "required",
        message: "Full name is required.",
      },
    ],
  },

  {
    name: "email",
    type: "email",
    label: "Email",
    validations: [
      {
        type: "required",
        message: "Email is required.",
      },
      {
        type: "email",
        message: "Please enter a valid email address.",
      },
    ],
  },

  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    options: [
      {
        label: "Individual",
        value: "individual",
      },
      {
        label: "Company",
        value: "company",
      },
    ],
    validations: [
      {
        type: "required",
        message: "Lead type is required.",
      },
    ],
  },

  {
    name: "companyName",
    type: "text",
    label: "Company name",
    condition: (values) => values.leadType === "company",
    validations: [
      {
        type: "required",
        message: "Company name is required.",
      },
    ],
  },

  {
    name: "phone",
    type: "text",
    label: "Phone",
    validations: [
      {
        type: "required",
        message: "Phone is required.",
      },
      {
        type: "digits",
        length: 10,
        message: "Phone must contain exactly 10 digits.",
      },
    ],
  },

  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    hint: "Maximum 200 characters.",
    validations: [
      {
        type: "maxLength",
        value: 200,
        message: "Notes cannot exceed 200 characters.",
      },
    ],
  },

  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted.",
    validations: [
      {
        type: "required",
        message: "Consent is required.",
      },
    ],
  },
];