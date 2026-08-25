import clsx from "clsx";

type SubtitleAuthProps = {
    subtitle: string;
}

const SubtitleAuth = ({ subtitle }: SubtitleAuthProps) => {
    return(
        <p className={clsx(
            "mb-2 font-poppins text-xs font-semibold", 
            "tracking-[0.2em] text-over-secundary")}>
            {subtitle}
        </p>
    )
}

export default SubtitleAuth;