import clsx from "clsx";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState, type ChangeEvent } from "react";

type FormItemProps = {
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
};

const FormItem = ({ label, type, placeholder, autoComplete, value, onChange, error, success = false }: FormItemProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={clsx("flex flex-col", "gap-2")}>
      <label className={clsx("font-poppins text-sm font-medium", "text-primary-text")} htmlFor={label}>
        {label}
      </label>
      <div className={clsx("relative")}>
        <span className={clsx(
          "pointer-events-none absolute inset-y-0 left-0",
          "flex w-11 items-center justify-center",
          "text-primary-text-100/70",
        )}>
          {isPassword ? <LockKeyhole size={17} /> : <Mail size={18} />}
        </span>
        <input
          id={label}
          name={label.toLowerCase().replaceAll(" ", "-")}
          type={isPassword && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${label}-error` : undefined}
          className={clsx(
            "h-12 w-full rounded-md border bg-primary px-11",
            "font-poppins text-sm text-primary-text",
            "outline-none transition-colors placeholder:text-primary-text-100/55",
            error ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-primary-text/15 focus:border-over-secundary focus:ring-1 focus:ring-over-secundary",
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className={clsx(
              "absolute inset-y-0 right-0 flex w-11 items-center justify-center",
              "text-primary-text-100/70 transition-colors hover:text-over-secundary",
              "focus:outline-none",
            )}
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {isPasswordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </div>
      {error && <p id={`${label}-error`} className={clsx("font-poppins text-xs", "text-red-600")}>{error}</p>}
      {!error && success && <p className={clsx("font-poppins text-xs", "text-green-700")}>Looks good.</p>}
    </div>
  );
};

export default FormItem;
