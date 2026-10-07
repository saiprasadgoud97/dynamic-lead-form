import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { TextInput } from "../../components/design-system/atoms/TextInput";
import { Select } from "../../components/design-system/atoms/Select";
import { Textarea } from "../../components/design-system/atoms/Textarea";
import { Checkbox } from "../../components/design-system/atoms/Checkbox";
import { Button } from "../../components/design-system/atoms/Button";
import { Field } from "../../components/design-system/molecules/Field";

import { leadFormConfig } from "./config/leadFormConfig";
import { validateLeadForm } from "./validation/validateLeadForm";
import type {
  FieldConfig,
  LeadFormValues,
} from "./types/lead.types";

import "./LeadForm.css";

const initialValues: LeadFormValues = {
  fullName: "",
  email: "",
  leadType: "",
  companyName: "",
  phone: "",
  notes: "",
  consent: false,
};

export function LeadForm() {
  const [values, setValues] =
    useState<LeadFormValues>(initialValues);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [submitted, setSubmitted] =
    useState(false);

  const updateValue = (
    name: keyof LeadFormValues,
    value: string | boolean
  ) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear the current field error while editing.
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleBlur = (
    fieldName: keyof LeadFormValues
  ) => {
    const currentErrors = validateLeadForm(
      leadFormConfig,
      values
    );

    setErrors((previous) => ({
      ...previous,
      [fieldName]:
        currentErrors[fieldName] || "",
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors =
      validateLeadForm(
        leadFormConfig,
        values
      );

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  const renderControl = (
    field: FieldConfig
  ) => {
    const fieldValue = values[field.name];
    const hasError = Boolean(errors[field.name]);

    switch (field.type) {
      case "text":
        return (
          <TextInput
            name={field.name}
            value={fieldValue as string}
            label={field.label}
            onChange={(
              event: ChangeEvent<HTMLInputElement>
            ) =>
              updateValue(
                field.name,
                event.target.value
              )
            }
            onBlur={() =>
              handleBlur(field.name)
            }
            hasError={hasError}
          />
        );

      case "email":
        return (
          <TextInput
            name={field.name}
            type="email"
            value={fieldValue as string}
            label={field.label}
            onChange={(
              event: ChangeEvent<HTMLInputElement>
            ) =>
              updateValue(
                field.name,
                event.target.value
              )
            }
            onBlur={() =>
              handleBlur(field.name)
            }
            hasError={hasError}
          />
        );

      case "select":
        return (
          <Select
            name={field.name}
            value={fieldValue as string}
            label={field.label}
            options={field.options ?? []}
            onChange={(
              event: ChangeEvent<HTMLSelectElement>
            ) =>
              updateValue(
                field.name,
                event.target.value
              )
            }
            onBlur={() =>
              handleBlur(field.name)
            }
            hasError={hasError}
          />
        );

      case "textarea":
        return (
          <div>
            <Textarea
              name={field.name}
              value={fieldValue as string}
              label={field.label}
              maxLength={200}
              onChange={(
                event: ChangeEvent<HTMLTextAreaElement>
              ) =>
                updateValue(
                  field.name,
                  event.target.value
                )
              }
              onBlur={() =>
                handleBlur(field.name)
              }
              hasError={hasError}
            />

            <div className="character-count">
              {(fieldValue as string).length}/200
            </div>
          </div>
        );

      case "checkbox":
        return (
          <Checkbox
            name={field.name}
            value={fieldValue as boolean}
            label={field.label}
            onChange={(
              event: ChangeEvent<HTMLInputElement>
            ) =>
              updateValue(
                field.name,
                event.target.checked
              )
            }
            onBlur={() =>
              handleBlur(field.name)
            }
            hasError={hasError}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="lead-page">
      <section className="lead-card">
        <div className="lead-header">
          <p className="eyebrow">
            Get in touch
          </p>

          <h1>Tell us about your lead</h1>

          <p className="lead-description">
            Fill in the details below and our
            team will get back to you.
          </p>
        </div>

        <form
          className="lead-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-grid">
            {leadFormConfig.map((field) => {
              if (
                field.condition &&
                !field.condition(values)
              ) {
                return null;
              }

              const isFullWidth =
                field.name === "notes" ||
                field.name === "consent";

              return (
                <Field
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  hint={field.hint}
                  error={errors[field.name]}
                  fullWidth={isFullWidth}
                >
                  {renderControl(field)}
                </Field>
              );
            })}
          </div>

          <div className="submit-container">
            <Button type="submit">
              Submit
            </Button>
          </div>

          {submitted && (
            <div className="success-message">
              <h2>Form submitted successfully</h2>

              <pre>
                {JSON.stringify(
                  values,
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}