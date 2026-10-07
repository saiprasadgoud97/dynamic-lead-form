import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className="button"
      {...props}
    >
      {children}
    </button>
  );
}