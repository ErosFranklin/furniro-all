import clsx from "clsx";

type AuthShowcaseProps = {
  image: string;
  imageAlt: string;
  title: string;
  highlightedTitle: string;
  description: string;
  referenceCode: string;
};

const AuthShowcase = ({ image, imageAlt, title, highlightedTitle, description, referenceCode }: AuthShowcaseProps) => {
  return (
    <section className={clsx("relative hidden min-h-screen overflow-hidden", "lg:block")}>
      <img src={image} alt={imageAlt} className={clsx("absolute inset-0 h-full w-full", "object-cover object-center")} />
      <div className={clsx("absolute inset-0", "bg-primary-text/12")} />
      <div className={clsx("absolute bottom-12 left-12", "max-w-md text-primary")}>
        <h1 className={clsx("mb-4 font-poppins text-5xl font-semibold", "leading-[1.08]")}>
          {title} <span className={clsx("text-over-secundary")}>{highlightedTitle}</span>
        </h1>
        <p className={clsx("max-w-55 font-poppins text-sm", "leading-5 text-primary/90")}>{description}</p>
      </div>
      <div className={clsx("absolute bottom-12 left-5 flex items-center", "gap-3 [writing-mode:vertical-rl]")}>
        <span className={clsx("font-poppins text-[10px] font-medium", "tracking-[0.35em] text-over-secundary")}>{referenceCode}</span>
        <span className={clsx("h-25 w-px", "bg-over-secundary/80")} />
      </div>
    </section>
  );
};

export default AuthShowcase;
