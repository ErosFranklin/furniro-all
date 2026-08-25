import clsx from "clsx";
import { Check, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/user.service";
import FormItem from "../FormItem";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = { email: "", password: "", confirmPassword: "" };

const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

const ContainerForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const passwordRules = [
    { label: "At least 6 characters", valid: values.password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(values.password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(values.password) },
    { label: "One number", valid: /\d/.test(values.password) },
  ];
  const isPasswordValid = passwordRules.every((rule) => rule.valid);
  const isConfirmationValid = values.confirmPassword.length > 0 && values.password === values.confirmPassword;

  const showEmailError = (values.email.length > 0 || hasSubmitted) && !isValidEmail(values.email);
  const showPasswordError = (values.password.length > 0 || hasSubmitted) && !isPasswordValid;
  const showConfirmationError = (values.confirmPassword.length > 0 || hasSubmitted) && !isConfirmationValid;

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (!isValidEmail(values.email) || !isPasswordValid || !isConfirmationValid) {
      toast.error("Check the highlighted fields before creating your account.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createUser({ email: values.email.trim(), password: values.password });
      toast.success("Account created successfully.");
      setValues(initialValues);
      setHasSubmitted(false);
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "We couldn't create your account. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={clsx("flex w-full flex-col", "gap-5")} onSubmit={handleSubmit} noValidate>
      <FormItem
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        error={showEmailError ? "Enter a valid email address." : undefined}
        success={values.email.length > 0 && isValidEmail(values.email)}
      />
      <div>
        <FormItem
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => handleChange("password", event.target.value)}
          error={showPasswordError ? "Your password does not meet all requirements." : undefined}
        />
        {values.password.length > 0 && (
          <ul className={clsx("mt-2 grid grid-cols-2 gap-x-3 gap-y-1", "font-poppins text-xs text-primary-text-100")}>
            {passwordRules.map((rule) => (
              <li key={rule.label} className={clsx("flex items-center gap-1", rule.valid ? "text-green-700" : "text-primary-text-100")}>
                {rule.valid ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}
                {rule.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <FormItem
        label="Confirm password"
        type="password"
        placeholder="Enter your password again"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={(event) => handleChange("confirmPassword", event.target.value)}
        error={showConfirmationError ? "Passwords do not match." : undefined}
        success={isConfirmationValid}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "mt-1 flex h-12 items-center justify-center gap-3 rounded-md",
          "bg-primary-text font-poppins text-sm font-semibold text-primary",
          "cursor-pointer transition-colors hover:bg-over-secundary",
          "focus:outline-none focus:ring-2 focus:ring-over-secundary focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {isSubmitting ? "Creating account..." : "Create account"} <span className={clsx("text-xl font-normal", "leading-none")}>&rarr;</span>
      </button>
    </form>
  );
};

export default ContainerForm;
