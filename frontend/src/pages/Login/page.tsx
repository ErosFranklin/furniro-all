import clsx from "clsx";
import AuthFormContainer from "../../components/AuthFormContainer";
import AuthShowcase from "../../components/AuthShowcase";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  return (
   <main className={clsx("grid min-h-screen bg-primary", "lg:grid-cols-[55fr_45fr]")}>
      <AuthShowcase
        image="/Images/Auth.jpg"
        imageAlt="Furniro setting with plants and furniture"
        title="Furniture designed for"
        highlightedTitle="your way of living."
        description="Timeless pieces, crafted to make your space yours."
        referenceCode="FURNIRO / 011"
      />
      <AuthFormContainer
        subtitle="WELCOME TO BACK FURNIRO"
        title="Sign in to your account"
        description="Sign in to your account and start using Furniro."
        footer={
          <p className={clsx("text-md text-primary-text-100")}>
            Don't have an account yet? <a href="/signup" className={clsx("font-poppins text-sm font-semibold", "text-over-secundary hover:underline")}>Sign up</a>
          </p>
        }
      >
        <LoginForm />
      </AuthFormContainer>
    </main>
  );
};

export default LoginPage;