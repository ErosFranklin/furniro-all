import clsx from "clsx";

type TitleAuthProps = {
  title: string;
};

const TitleAuth = ({title} : TitleAuthProps) => {
    return(
        <h2 className={clsx(
            "mb-3 font-poppins text-4xl font-semibold", 
            "leading-tight tracking-tight text-primary-text sm:text-[42px]"
            )}>{title}
        </h2>
    )
}

export default TitleAuth;