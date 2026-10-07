import type { ReactNode } from "react";

interface FieldProps {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Field({
  name,
  label,
  hint,
  error,
  children,
  fullWidth = false,
}: FieldProps) {
  return (
    <div className={`field ${fullWidth ? "field-full-width" : ""}`}>
      <label
        htmlFor={name}
        className="field-label"
      >
        {label}
      </label>

      {children}

      {hint && !error && (
        <p className="field-hint">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${name}-error`}
          className="field-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}