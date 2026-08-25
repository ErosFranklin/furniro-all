import clsx from "clsx";

type DescriptionAuthProps = {
    description: string;
}

const DescriptionAuth = ({ description }: DescriptionAuthProps) => {
  return (
     <p className={clsx(
        "max-w-sm font-poppins text-sm", 
        "leading-5 text-primary-text-100"
        )}>{description}
    </p>
  )
}

export default DescriptionAuth;