import clsx from "clsx";

type ContactFormItemProps = {
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const ContactFormItem = ({ label, placeholder, type, value, onChange, error }: ContactFormItemProps) => {
  const inputClassName = clsx(
    "w-full rounded-[10px] border bg-primary px-3 font-poppins text-sm text-primary-text outline-none transition-colors",
    "placeholder:text-[#9F9F9F]",
    error ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-[#9F9F9F] focus:border-over-secundary focus:ring-1 focus:ring-over-secundary",
  );
  const inputProps = {
    id: label, name: label.toLowerCase().replaceAll(" ", "-"), placeholder, value,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };

  return(
    <div className="mb-9 flex flex-col">
        <label className={clsx(
            "mb-5.5 font-poppins text-[16px] text-primary-text"
            )} 
            htmlFor={label}>
            {label}
        </label>
        {type === "textarea" 
            ? 
            <textarea {...inputProps} className={clsx(inputClassName, "h-30 resize-none py-3")} /> 
            : 
            <input {...inputProps} className={clsx(inputClassName, "h-18.75")} type={type} />}
        {error && <p id={`${label}-error`} className={clsx(
            "mt-2 font-poppins text-xs text-red-600"
            )}>{error}
        </p>}
    </div>
  )
}

export default ContactFormItem;
