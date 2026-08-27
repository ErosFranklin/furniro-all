import clsx from "clsx";

type TitlePageProps = {
    title : string;
    description?: string;
    className?: string;
}

const TitlePage = ({ title, description, className }: TitlePageProps) =>{
    return(
        <div className={clsx(
            "flex flex-col items-center justify-center text-center",
            "mx-auto mt-12 w-full max-w-[645px] px-6 sm:px-8 lg:mt-[98px] lg:px-0",
            "gap-2",
            className
        )}>
            <h1 className={clsx(
                "text-[28px] font-semibold sm:text-[36px]"
            )}>{title}</h1>
            {description && <p className={clsx(
                "text-[#9F9F9F] font-normal text-[14px] font-poppins sm:text-[16px]"
            )}>{description}</p>}
        </div>
    )
}

export default TitlePage
