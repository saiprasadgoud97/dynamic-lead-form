export type FieldType =
  | "text"
  | "email"
  | "select"
  | "textarea"
  | "checkbox";

export type ValidationRule =
  | {
      type: "required";
      message: string;
    }
  | {
      type: "email";
      message: string;
    }
  | {
      type: "digits";
      length: number;
      message: string;
    }
  | {
      type: "maxLength";
      value: number;
      message: string;
    };

export interface SelectOption {
  label: string;
  value: string;
}

export interface LeadFormValues {
  fullName: string;
  email: string;
  leadType: string;
  companyName: string;
  phone: string;
  notes: string;
  consent: boolean;
}

export interface FieldConfig {
  name: keyof LeadFormValues;
  type: FieldType;
  label: string;
  hint?: string;
  validations?: ValidationRule[];
  options?: SelectOption[];
  condition?: (values: LeadFormValues) => boolean;
}