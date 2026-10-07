import type { ChangeEvent } from "react";

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError?: boolean;
}

export function TextInput({
  name,
  value,
  label,
  type = "text",
  placeholder,
  onChange,
  onBlur,
  hasError = false,
}: TextInputProps) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      aria-label={label}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={hasError}
      className="form-control"
    />
  );
}