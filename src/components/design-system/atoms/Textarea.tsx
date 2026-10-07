import type { ChangeEvent } from "react";

interface TextareaProps {
  name: string;
  value: string;
  label: string;
  maxLength?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  hasError?: boolean;
}

export function Textarea({
  name,
  value,
  label,
  maxLength,
  onChange,
  onBlur,
  hasError = false,
}: TextareaProps) {
  return (
    <textarea
      id={name}
      name={name}
      value={value}
      aria-label={label}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={hasError}
      className="form-control textarea-control"
      rows={5}
    />
  );
}