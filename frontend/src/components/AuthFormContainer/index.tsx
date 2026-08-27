import clsx from "clsx";
import type { ReactNode } from "react";
import DescriptionAuth from "../DescriptionAuth";
import SubtitleAuth from "../SubtitleAuth";
import TitleAuth from "../TitleAuth";

type AuthFormContainerProps = {
  subtitle: string;
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
};

const AuthFormContainer = ({ subtitle, title, description, footer, children }: AuthFormContainerProps) => {
  return (
    <section className={clsx("flex min-h-screen flex-col items-center justify-center", "bg-[#fcfaf7] px-7 py-12 sm:px-12")}>
      <div className={clsx("w-full max-w-155")}>
        <div className={clsx("mb-10")}>
          <div className={clsx("mb-11 flex items-center justify-center", "gap-2")}>
            <img src="/Logo/Logo.svg" alt="Furniro" className={clsx("h-9 w-12", "object-contain")} />
            <span className={clsx("font-montserrat text-lg font-bold", "tracking-[0.35em] text-over-primary")}>FURNIRO</span>
          </div>
          <SubtitleAuth subtitle={subtitle} />
          <TitleAuth title={title} />
          <DescriptionAuth description={description} />
        </div>
        {children}
      </div>
      {footer && <div className={clsx("mt-4")}>{footer}</div>}
    </section>
  );
};

export default AuthFormContainer;
