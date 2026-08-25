import clsx from "clsx";
import AuthFormContainer from "../../components/AuthFormContainer";
import AuthShowcase from "../../components/AuthShowcase";
import ContainerForm from "../../components/ContainerForm";

const SignUpPage = () => {
  return (
    <main className={clsx("grid min-h-screen bg-primary", "lg:grid-cols-[55fr_45fr]")}>
      <AuthShowcase
        image="/Images/Auth.jpg"
        imageAlt="Ambiente Furniro com plantas e móveis"
        title="Furniture designed for"
        highlightedTitle="your way of living."
        description="Timeless pieces, crafted to make your space yours."
        referenceCode="FURNIRO / 011"
      />
      <AuthFormContainer
        subtitle="WELCOME TO FURNIRO"
        title="Create your account"
        description="Create your account and start using Furniro."
        footer={
          <p className={clsx("text-md text-primary-text-100")}>
            Already have an account? <a href="/login" className={clsx("font-poppins text-sm font-semibold", "text-over-secundary hover:underline")}>Sign in</a>
          </p>
        }
      >
        <ContainerForm />
      </AuthFormContainer>
    </main>
  );
};

export default SignUpPage;
