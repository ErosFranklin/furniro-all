import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/user.service";
import FormItem from "../FormItem";
import LoadingSpinner from "../LoadingSpinner";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = { email: "", password: "" };

const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { setUser } = useAuth();

  const showEmailError =
    (values.email.length > 0 || hasSubmitted) && !isValidEmail(values.email);
  const showPasswordError = hasSubmitted && values.password.length === 0;

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (!isValidEmail(values.email) || values.password.length === 0) {
      toast.error("Check the highlighted fields before signing in.");
      return;
    }

    try {
      setIsSubmitting(true);
      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
      const { data } = await api.get("/users/me");
      setUser(data);
      toast.success("Signed in successfully.");
      const redirectTo =
        typeof location.state?.from === "string" &&
        location.state.from.startsWith("/")
          ? location.state.from
          : "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Email or password incorrect.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={clsx("flex w-full flex-col", "gap-5")}
      onSubmit={handleSubmit}
      noValidate
    >
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
      <FormItem
        label="Password"
        type="password"
        placeholder="Your password"
        autoComplete="current-password"
        value={values.password}
        onChange={(event) => handleChange("password", event.target.value)}
        error={showPasswordError ? "Enter your password." : undefined}
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
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <>
            Sign in{" "}
            <span className={clsx("text-xl font-normal", "leading-none")}>
              &rarr;
            </span>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
