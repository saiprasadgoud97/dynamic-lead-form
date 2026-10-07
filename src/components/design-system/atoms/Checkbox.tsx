import type { ChangeEvent } from "react";

interface CheckboxProps {
  name: string;
  value: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError?: boolean;
}

export function Checkbox({
  name,
  value,
  label,
  onChange,
  onBlur,
  hasError = false,
}: CheckboxProps) {
  return (
    <label className="checkbox-control">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
      />

      <span>{label}</span>
    </label>
  );
}