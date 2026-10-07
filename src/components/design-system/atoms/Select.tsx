import type { ChangeEvent } from "react";
import type { SelectOption } from "../../../features/lead/types/lead.types";

interface SelectProps {
  name: string;
  value: string;
  label: string;
  options: SelectOption[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
  hasError?: boolean;
}

export function Select({
  name,
  value,
  label,
  options,
  onChange,
  onBlur,
  hasError = false,
}: SelectProps) {
  return (
    <select
      id={name}
      name={name}
      value={value}
      aria-label={label}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={hasError}
      className="form-control"
    >
      <option value="">Select {label}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}