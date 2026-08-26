import clsx from "clsx";

type ContactItemsProps = {
    icon: string
    title: string;
    lines: string[];
}

const ContactItems = ({icon, title, lines}: ContactItemsProps) =>{
    return (
        <div className={clsx("flex gap-4")}>
            <div className={clsx("mt-1 shrink-0")}> <img src={icon} alt="" /></div>
            <div>
                <h3 className={clsx(
                    "font-poppins text-[20px] font-medium text-primary-text sm:text-[24px]"
                    )}>
                    {title}
                </h3>
                <div className={clsx(
                    "mt-1 font-poppins text-[14px] text-primary-text-100 sm:text-[16px]"
                )}>
                    {lines.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContactItems
